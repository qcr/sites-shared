import glob from 'glob';
import {promisify} from 'util';

import type * as webpack from 'webpack';

const globP = promisify(glob.glob);

async function asyncLoader(
  ctx: webpack.LoaderContext<any>,
  input: string,
  cb: (err: Error | null, result: string) => void
) {
  // Obtain and return the file list
  const out = JSON.stringify(
    await globsToFiles(input.trim().split('\n'), ctx.context, ctx.rootContext)
  );
  cb(null, ctx.loaderIndex == 0 ? `export default ${out}` : out);
  return;
}

async function globsToFiles(globs: string[], ctx: string, root: string) {
  let files: string[] = [];
  await Promise.all(
    globs.map(async (g) => {
      const x = await globP(globs[0], {cwd: ctx, root: root});
      files.push(...x);
    })
  );
  return files;
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
