import Handlebars, {HelperOptions} from 'handlebars';
import {promisify} from 'util';
import reactToString from 'react-element-to-jsx-string';

import type * as webpack from 'webpack';

import components from '../custom_components';

const inst = Handlebars.create();

export type ComponentSubstitution = (
  data: any,
  key: string
) => React.ReactElement;

export type ComponentRendering = (props: {
  [key: string]: any;
}) => React.ReactElement;

export type ComponentDeclarations = {
  [key: string]: {
    substitute: ComponentSubstitution;
    render: ComponentRendering;
  };
};

const definedComponents: ComponentDeclarations = {...components};

export function componentHelpers(components: ComponentDeclarations) {
  return Object.fromEntries(
    Object.entries(components).map(([k, v]) => [
      k,
      (...args: any[]) => {
        const opts = args[args.length - 1] as HelperOptions;
        return new Handlebars.SafeString(
          reactToString(
            v.substitute(
              args[0],
              opts.data.key !== undefined
                ? opts.data.key
                : opts.data.index !== undefined
                ? opts.data.index.toString()
                : undefined // Key can be blank, that means we're not in a list!
            )
          )
        );
      },
    ])
  );
}
async function asyncLoader(
  ctx: webpack.LoaderContext<any>,
  input: string,
  cb: (err: Error | null, result?: string) => void
) {
  const loaderPath = ctx.loaders[ctx.loaderIndex].path;
  const resolveP = promisify(ctx.resolve);
  const opts = ctx.getOptions();
  const query = new URLSearchParams(ctx.resourceQuery.slice(1));

  // Load and apply custom components list
  if (opts.components) {
    await Promise.all(
      (typeof opts.components === 'string'
        ? [opts.components]
        : (opts.components as string[])
      ).map(async (c) => {
        const componentsPath = await resolveP(loaderPath, c);
        if (typeof componentsPath !== 'string') {
          cb(Error(`Could not find 'components': ${c}`));
          return;
        }
        Object.assign(
          definedComponents,
          (await import(componentsPath)).default
        );
      })
    );
  }
  const definedHelpers = componentHelpers(definedComponents);

  // Load and apply custom helpers list
  // TODO only add back in custom helpers if custom components isn't sufficient
  // if (opts.helpers) {
  //   await Promise.all(
  //     (typeof opts.helpers === 'string'
  //       ? [opts.helpers]
  //       : (opts.helpers as string[])
  //     ).map(async (h) => {
  //       const helpersPath = await resolveP(loaderPath, h);
  //       if (typeof helpersPath !== 'string') {
  //         cb(Error(`Could not find 'helpers': ${h}`));
  //         return;
  //       }
  //       Object.assign(definedHelpers, (await import(helpersPath)).default);
  //     })
  //   );
  // }
  inst.registerHelper(definedHelpers);

  // Load the requested data
  const d = query.get('data') ? query.get('data') : opts.data;
  let data;
  try {
    if (!d) throw Error();
    data = (await ctx.importModule(d)).default;
  } catch (e) {
    cb(Error(`Failed to load handlebars data from '${d}'`));
    return;
  }

  // Tweak compile string if we have received a context query
  const c = query.get('context') ? query.get('context') : opts.context;
  const hbString = c ? `{{#with ${c}}}\n${input}\n{{/with}}` : input;

  // Compile and return a result; erroring as gracefully as possible
  try {
    const out = inst.compile(hbString)(data);
    cb(
      null,
      ctx.loaderIndex == 0 ? `export default ${JSON.stringify(out)}` : out
    );
  } catch (e) {
    // TODO figure out why we can't emit useful errors....
    // TODO print list of supported components as part of component errors
    // ctx.emitError(
    //   Error(
    //     `in ${ctx.resourcePath} Module Error (from ${
    //       ctx.loaders[ctx.loaderIndex].path
    //     })\n`
    //   )
    // );
    const err = e as Error;
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
