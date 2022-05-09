import type * as webpack from 'webpack';

// Why do we end up with this weird looking rubbish?
// 1. Next packages some compiled webpack stuff that doesn't support ESM
// modules (some error with 'next/dist/compiled/webpack/bundle5.js')
// 2. MDX and Remark have moved onto only ESM support
//      https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
// 3. Even though Next Config files support ESM modules, the bundled webpack
// errors stop you using them...
//      https://github.com/vercel/next.js/issues/9607
// 4. We can't use '@mdx-js/loader' as we have no way of setting options (Next
// Config can't use ESM modules and loaders simultaneously, and there's no
// loader syntax for passing options objects in code)
//      https://webpack.js.org/api/loaders/
// 5. We can't use the "dynamic import()" suggestion because Typescript doesn't
// have a mode to output "commonjs with dynamic imports" (it replaces them all
// with require() calls...)
//      https://github.com/microsoft/TypeScript/issues/43329
// 6. Bringing in the nightly build with 'module: "node12"' results in other
// errors further down the chain...
//
// So we end up with the little hacks below from this comment:
//      https://github.com/microsoft/TypeScript/issues/43329#issuecomment-1008361973
//
// Perfect example of how shit an ecosystem JS is to work with. In what world
// is a developer going to enjoy going through that mess just to get expected
// language functionality working?

const mdx = Function('return import("@mdx-js/mdx")')() as Promise<
  typeof import('@mdx-js/mdx')
>;
const remarkGfm = Function('return import("remark-gfm")')() as Promise<
  typeof import('remark-gfm')
>;

async function asyncLoader(
  ctx: webpack.LoaderContext<any>,
  input: string,
  cb: (err: Error | null, result?: string) => void
) {
  // Perform any text manipulations necessary for standard MD support
  input = input.replace(/<!--/g, '{/*').replace(/-->/g, '*/}');

  // Compile the text using MDX
  const compile = (await mdx).compile;
  try {
    const x = await compile(input, {
      remarkPlugins: [(await remarkGfm).default],
    });
    cb(null, x.toString());
  } catch (e) {
    cb(
      Error(
        e instanceof Error
          ? e.message
          : typeof e === 'string'
          ? e
          : 'Undefined error'
      )
    );
  }
}

export default function loader(
  this: webpack.LoaderContext<any>,
  input: string
) {
  const cb = this.async();
  asyncLoader(this, input, (e, r) => {
    if (e) return cb(e);
    cb(null, r);
  });
}
