import * as process from 'process';

import { DataSource } from 'typeorm';

import { User } from '../entities/user.entity';

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