import mdi from 'markdown-it';

import type * as webpack from 'webpack';

const renderer = mdi({
  html: true,
})
  .use(require('markdown-it-block-embed'), {
    containerClassName: 'embedded-block',
  })
  .use(require('markdown-it-prism'));

async function asyncLoader(
  ctx: webpack.LoaderContext<any>,
  input: string,
  cb: (err: Error | null, result: string) => void
) {
  // const out = renderer.render(input);
  const out = JSON.stringify('MARKDOWN');
  cb(null, ctx.loaderIndex === 0 ? `export default ${out}` : out);
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
