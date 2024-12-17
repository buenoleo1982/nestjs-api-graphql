import * as dotenv from 'dotenv';

import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

dotenv.config({ path: '.env' });

const configService = new ConfigService();

export default new DataSource({
  type: 'oracle',
  host: configService.get('ORACLE_DB_HOST'),
  port: configService.get('ORACLE_DB_PORT'),
  username: configService.get('ORACLE_DB_USERNAME'),
  password: configService.get('ORACLE_DB_PASSWORD'),
  sid: configService.get('ORACLE_DB_SID'),
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/oracle/**/*.ts'],
  migrationsTableName: 'migrations',
});
