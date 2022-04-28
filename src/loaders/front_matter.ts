import matter from 'gray-matter';

import type * as webpack from 'webpack';

export default function loader(
  this: webpack.LoaderContext<any>,
  input: string
) {
  const out = JSON.stringify(matter(input));
  return this.loaderIndex == 0 ? `export default ${out}` : out;
}
