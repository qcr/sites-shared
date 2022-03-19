import Handlebars from 'handlebars';

import type * as webpack from 'webpack';

import addHelpers from './handlebars-helpers';
import type {HelperError} from './handlebars-helpers';

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
    addHelpers(inst);
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

  try {
    const out = inst.compile(input)(data);
    cb(
      null,
      ctx.loaderIndex == 0 ? `export default ${JSON.stringify(out)}` : out
    );
  } catch (e) {
    // TODO figure out why we can't emit useful errors....
    const err = e as HelperError;
    // ctx.emitError(
    //   Error(
    //     `in ${ctx.resourcePath} Module Error (from ${
    //       ctx.loaders[ctx.loaderIndex].path
    //     })\n`
    //   )
    // );
    cb(Error(`${err.name}: ${err.message}`));
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
