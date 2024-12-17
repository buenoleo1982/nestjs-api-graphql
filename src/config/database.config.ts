import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';


@Injectable()
export class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'oracle',
      host: configService.get('DB_HOST', 'localhost'),
      port: configService.get('DB_PORT', 1521),
      username: configService.get('DB_USERNAME', 'your_username'),
      password: configService.get('DB_PASSWORD', 'your_password'),
      sid: configService.get('DB_SID', 'your_sid'),
      entities: [User],
      synchronize: false,
      logging: configService.get('NODE_ENV') === 'development',
      maxQueryExecutionTime: 1000,
      extra: {
        poolSize: 5,
      },
    };
  }
}