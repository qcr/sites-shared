import yaml from 'yaml';

import type * as webpack from 'webpack';

export default function loader(
  this: webpack.LoaderContext<any>,
  input: string
): string {
  const out = JSON.stringify(yaml.parse(input));
  return this.loaderIndex == 0 ? `export default ${out}` : out;
}
