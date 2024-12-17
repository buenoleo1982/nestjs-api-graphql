import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { DatabaseModule } from './config/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { StatusResolver } from './graphql/schema';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
  ],
  providers: [StatusResolver],
})
export class AppModule {}
