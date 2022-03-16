import Handlebars from 'handlebars';

import type * as webpack from 'webpack';

async function asyncLoader(
  ctx: webpack.LoaderContext<any>,
  input: string,
  cb: (err: Error | null, result?: string) => void
) {
  const opts = ctx.getOptions();
  let data;
  try {
    if (!opts.data) throw Error();
    data = (await ctx.importModule(opts.data)).default;
  } catch (e) {
    cb(Error(`Failed to load handlebars data from '${opts.data}'`));
    return;
  }

  const out = JSON.stringify(Handlebars.compile(input)(data));
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
