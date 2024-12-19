import * as path from 'path';
import * as process from 'process';
import * as tsConfigPaths from 'tsconfig-paths';

import { DataSource } from 'typeorm';
import { User } from '@/graphql/modules/users/entities/user.entity';

// Registra os paths do tsconfig
const tsConfig = require('../../tsconfig.json');
const baseUrl = path.join(
  process.cwd(),
  tsConfig.compilerOptions.baseUrl || './',
);

tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});


export default new DataSource({
  type: 'oracle',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  sid: process.env.DB_SID,
  entities: [User],
  migrations: ['src/migrations/*.ts'],
});
