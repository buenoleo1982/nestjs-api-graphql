import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { StatusResolver } from './graphql/schema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
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

        switch (dbType) {
          case 'oracle':
            return {
              ...baseConfig,
              type: 'oracle',
              sid: configService.get(`${dbPrefix}DB_SID`),
            };
          case 'mssql':
            return {
              ...baseConfig,
              type: 'mssql',
              database: configService.get(`${dbPrefix}DB_NAME`),
              port: parseInt(configService.get(`${dbPrefix}DB_PORT`)),
              options: {
                encrypt: false,
                trustServerCertificate: true,
              },
            };
          default: // postgres
            return {
              ...baseConfig,
              type: 'postgres',
              database: configService.get(`${dbPrefix}DB_NAME`),
            };
        }
      },
    }),
  ],
  providers: [StatusResolver],
})
export class AppModule {}
