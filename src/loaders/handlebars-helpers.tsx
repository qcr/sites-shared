import Handlebars, {HelperDeclareSpec, HelperOptions} from 'handlebars';
import reactToString from 'react-element-to-jsx-string';

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

export const components: ComponentDeclarations = {};

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

export const helperError = (
  name: string,
  message: string,
  details: HelperOptions
) => ({
  name: name,
  message: message,
  details: details,
});

export const ComponentNameError = (name: string, opts: HelperOptions) =>
  helperError(
    'ComponentError',
    `Requested component '${name}' is not supported.`,
    opts
  );
