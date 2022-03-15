import type * as webpack from 'webpack';

async function asyncLoader(
  ctx: webpack.LoaderContext<any>,
  input: string,
  cb: (err: Error | null, result: string) => void
) {
  const out = 'test';
  cb(null, ctx.loaderIndex == 0 ? `export default ${out}` : out);
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
