import moduleAlias from 'module-alias';

import * as path from 'path';

const rootDirectory = path.resolve(__dirname, '../../');

moduleAlias.addAliases({
  '@src': path.join(rootDirectory, 'src'),
  '@tests': path.join(rootDirectory, 'tests'),
});
