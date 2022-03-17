import Handlebars from 'handlebars';

import type * as webpack from 'webpack';

async function asyncLoader(
  ctx: webpack.LoaderContext<any>,
  input: string,
  cb: (err: Error | null, result?: string) => void
) {
  const query = new URLSearchParams(ctx.resourceQuery.slice(1));
  const d = query.get('data') ? query.get('data') : ctx.getOptions().data;
  let data;
  try {
    if (!d) throw Error();
    data = (await ctx.importModule(d)).default;
  } catch (e) {
    cb(Error(`Failed to load handlebars data from '${d}'`));
    return;
  }

  const out = Handlebars.compile(input)(data);
  cb(
    null,
    ctx.loaderIndex == 0 ? `export default ${JSON.stringify(out)}` : out
  );
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
