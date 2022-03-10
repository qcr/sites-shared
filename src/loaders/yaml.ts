import yaml from 'yaml';

import type * as webpack from 'webpack';

export default function loader(
  this: webpack.LoaderContext<any>,
  input: string
): string {
  return `export default ${JSON.stringify(yaml.parse(input))}`;
}
