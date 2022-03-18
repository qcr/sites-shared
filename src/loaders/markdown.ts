import {renderToString} from 'react-dom/server';

import type * as webpack from 'webpack';

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
  const compile = (await mdx).compile;
  const x = await compile(input, {
    remarkPlugins: [(await remarkGfm).default],
  });
  cb(null, String(x));
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
