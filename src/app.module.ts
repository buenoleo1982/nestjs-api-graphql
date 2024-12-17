import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
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

        if (dbType === 'oracle') {
          return {
            ...baseConfig,
            type: 'oracle',
            sid: configService.get(`${dbPrefix}DB_SID`),
          };
        } else {
          return {
            ...baseConfig,
            type: 'postgres',
            database: configService.get(`${dbPrefix}DB_NAME`),
          };
        }
      },
    }),
  ],
})
export class AppModule {}
