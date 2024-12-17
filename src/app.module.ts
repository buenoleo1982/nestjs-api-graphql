import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { DatabaseModule } from './config/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { StatusModule } from './graphql/status.module';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    StatusModule,
  ],
})
export class AppModule {}
