import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DatabaseConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    const dbType = configService.get('DB_TYPE');
    const dbPrefix = configService.get('DB_PREFIX');

    const baseConfig = {
      host: configService.get(`${dbPrefix}DB_HOST`),
      port: configService.get(`${dbPrefix}DB_PORT`),
      username: configService.get(`${dbPrefix}DB_USERNAME`),
      password: configService.get(`${dbPrefix}DB_PASSWORD`),
      entities: ['dist/**/*.entity.js'],
      synchronize: false,
      logging: true,
    };

    const dbConfigs: Record<string, TypeOrmModuleOptions> = {
      oracle: {
        ...baseConfig,
        type: 'oracle',
        sid: configService.get(`${dbPrefix}DB_SID`),
      },
      mssql: {
        ...baseConfig,
        type: 'mssql',
        database: configService.get(`${dbPrefix}DB_NAME`),
        port: parseInt(configService.get(`${dbPrefix}DB_PORT`)),
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
      },
      postgres: {
        ...baseConfig,
        type: 'postgres',
        database: configService.get(`${dbPrefix}DB_NAME`),
      },
    };

    return dbConfigs[dbType] || dbConfigs.postgres;
  }
}
