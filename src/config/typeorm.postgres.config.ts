import * as dotenv from 'dotenv';
import * as path from 'path';
import * as tsConfigPaths from 'tsconfig-paths';

import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const tsConfig = require('../../tsconfig.json');
const baseUrl = path.join(
  process.cwd(),
  tsConfig.compilerOptions.baseUrl || './',
);

tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});

dotenv.config({ path: '.env' });

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('PG_DB_HOST'),
  port: configService.get('PG_DB_PORT'),
  username: configService.get('PG_DB_USERNAME'),
  password: configService.get('PG_DB_PASSWORD'),
  database: configService.get('PG_DB_NAME'),
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/postgres/**/*.ts'],
  migrationsTableName: 'migrations',
});
