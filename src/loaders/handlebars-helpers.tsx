import Handlebars, {HelperDeclareSpec, HelperOptions} from 'handlebars';
import {renderToStaticMarkup} from 'react-dom/server';

import {Button, Typography} from '@mui/material';

type ComponentFunction = (ctx: any) => React.ReactElement;

export const components: {[key: string]: ComponentFunction} = {
  Button: (ctx) => <Button>{ctx.title}</Button>,
  Typography: (ctx) => (
    <Typography variant={ctx.variant}>{ctx.text}</Typography>
  ),
};

export interface HelperError {
  name: string;
  message: string;
  details: HelperOptions;
}

export const HelperError = (
  name: string,
  message: string,
  details: HelperOptions
) => ({
  name: name,
  message: message,
  details: details,
});

export const ComponentError = (name: string, opts: HelperOptions) =>
  HelperError(
    'ComponentError',
    `Requested component '${name}' is not supported.`,
    opts
  );

export const HelperArgsError = (
  name: string,
  expected: number,
  received: number,
  opts: HelperOptions
) =>
  HelperError(
    'ArgsError',
    `Helper '${name}' expects ${expected} arguments, but received ${received}.`,
    opts
  );

const helpers: HelperDeclareSpec = {
  component: (...args: any[]) => {
    const opts = args[args.length - 1] as HelperOptions;
    if (args.length !== 3)
      throw HelperArgsError('component', 3, args.length, opts);
    if (!args[1] || !(args[1] in components)) {
      throw ComponentError(args[1], opts);
    }
    return new Handlebars.SafeString(
      renderToStaticMarkup(components[args[1]](args[0]))
    );
  },
};

export default function addHelpers(hbs: typeof Handlebars) {
  hbs.registerHelper(helpers);
}
