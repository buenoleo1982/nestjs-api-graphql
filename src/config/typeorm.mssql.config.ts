import * as dotenv from 'dotenv';

import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

dotenv.config({ path: '.env' });

const configService = new ConfigService();

export default new DataSource({
  type: 'mssql',
  host: configService.get('MSSQL_DB_HOST'),
  port: parseInt(configService.get('MSSQL_DB_PORT')),
  username: configService.get('MSSQL_DB_USERNAME'),
  password: configService.get('MSSQL_DB_PASSWORD'),
  database: configService.get('MSSQL_DB_NAME'),
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/mssql/**/*.ts'],
  migrationsTableName: 'migrations',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
});
