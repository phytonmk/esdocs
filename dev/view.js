import { serve as esbuildServer } from 'esbuild';
import { resolve as resolvePath } from 'path';
import colors from 'picocolors';

import { getEsbuildConfigBase } from '../src/view/esbuildConfigBase.js';

esbuildServer(
  {
    servedir: resolvePath('./dist/test'),
    onRequest: ({ method, path, status, timeInMS }) => {
      const before = `[${method}] `;
      let main = path;
      const after = ` in ${timeInMS}ms`;

      if (status !== 200) {
        main += `:${status}`;
      }
      const message =
        colors.gray(before) +
        (status === 200 ? colors.green(main) : colors.red(main)) +
        colors.gray(after);

      // eslint-disable-next-line no-console
      console.log(message);
    },
  },
  getEsbuildConfigBase(
    [resolvePath('./src/view/index.jsx')],
    resolvePath('./dist/test/view')
  )
);
