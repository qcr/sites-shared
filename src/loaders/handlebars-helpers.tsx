import Handlebars, {HelperDeclareSpec, HelperOptions} from 'handlebars';
import reactToString from 'react-element-to-jsx-string';

import {Button, Typography} from '@mui/material';

export type ComponentDeclarations = {
  [key: string]: (ctx: any) => React.ReactElement;
};

export type HelperDeclarations = HelperDeclareSpec;

export const components: ComponentDeclarations = {
  Button: (ctx) => <Button>{ctx.title}</Button>,
  Typography: (ctx) => (
    <Typography variant={ctx.variant}>{ctx.text}</Typography>
  ),
};

export const helpers: HelperDeclarations = {
  csv: (...args: any[]) =>
    transformHelper(
      (arg: any) => (arg as string[]).join(', '),
      'csv',
      2,
      ...args
    ),
  lowercase: (...args: any[]) =>
    transformHelper(String.prototype.toLowerCase, 'lowercase', 2, ...args),
};

export function componentClosure(components: ComponentDeclarations) {
  return (...args: any[]) => {
    const opts = args[args.length - 1] as HelperOptions;
    if (args.length !== 3)
      throw HelperArgsError('component', 3, args.length, opts);
    if (!args[1] || !(args[1] in components)) {
      throw ComponentError(args[1], opts);
    }
    return new Handlebars.SafeString(
      reactToString(components[args[1]](args[0]))
    );
  };
}

export function transformHelper(
  fn: (arg: any) => string,
  name: string,
  nargs: number,
  ...args: any[]
) {
  const opts = args[args.length - 1] as HelperOptions;
  if (args.length !== nargs)
    throw HelperArgsError(name, nargs, args.length, opts);
  return fn(args[0]);
}

export interface HelperError {
  name: string;
  message: string;
  details: HelperOptions;
}

export const helperError = (
  name: string,
  message: string,
  details: HelperOptions
) => ({
  name: name,
  message: message,
  details: details,
});

export const ComponentError = (name: string, opts: HelperOptions) =>
  helperError(
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
  helperError(
    'ArgsError',
    `Helper '${name}' expects ${expected} arguments, but received ${received}.`,
    opts
  );
