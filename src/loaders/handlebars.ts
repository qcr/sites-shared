import Handlebars from 'handlebars';

import type * as webpack from 'webpack';

import blah from './handlebars-helpers';

const inst = Handlebars.create();

const loadedHelpers: string[] = [];

async function asyncLoader(
  ctx: webpack.LoaderContext<any>,
  input: string,
  cb: (err: Error | null, result?: string) => void
) {
  const opts = ctx.getOptions();

  const helpers = opts.helpers;
  if (helpers && !(helpers in loadedHelpers)) {
    blah(inst);
    // const fn = (await ctx.importModule(helpers)).default;
    // fn(inst);
    loadedHelpers.push(helpers);
  }

  const query = new URLSearchParams(ctx.resourceQuery.slice(1));
  const d = query.get('data') ? query.get('data') : opts.data;
  let data;
  try {
    if (!d) throw Error();
    data = (await ctx.importModule(d)).default;
  } catch (e) {
    cb(Error(`Failed to load handlebars data from '${d}'`));
    return;
  }

  const out = inst.compile(input)(data);
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
