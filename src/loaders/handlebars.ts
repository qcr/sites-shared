import Handlebars from 'handlebars';
import {promisify} from 'util';

import type * as webpack from 'webpack';

import {
  componentClosure,
  ComponentDeclarations,
  components,
  HelperDeclarations,
  HelperError,
  helpers,
} from './handlebars-helpers';

const inst = Handlebars.create();

const definedComponents: ComponentDeclarations = {...components};
const definedHelpers: HelperDeclarations = {...helpers};

async function asyncLoader(
  ctx: webpack.LoaderContext<any>,
  input: string,
  cb: (err: Error | null, result?: string) => void
) {
  const loaderPath = ctx.loaders[ctx.loaderIndex].path;
  const resolveP = promisify(ctx.resolve);
  const opts = ctx.getOptions();

  // Load and apply custom components list
  if (opts.components) {
    const componentsPath = await resolveP(loaderPath, opts.components);
    if (typeof componentsPath !== 'string') {
      cb(Error(`Could not find 'components': ${opts.components}`));
      return;
    }
    Object.assign(definedComponents, (await import(componentsPath)).default);
  }
  definedHelpers.component = componentClosure(definedComponents);

  // Load and apply custom helpers list
  if (opts.helpers) {
    const helpersPath = await resolveP(loaderPath, opts.helpers);
    if (typeof helpersPath !== 'string') {
      cb(Error(`Could not find 'helpers': ${opts.helpers}`));
      return;
    }
    Object.assign(definedHelpers, (await import(helpersPath)).default);
  }
  inst.registerHelper(definedHelpers);

  console.log('DEFINED COMPONENTS ARE:');
  console.log(definedComponents);
  console.log('DEFINED HELPERS ARE:');
  console.log(definedHelpers);

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
