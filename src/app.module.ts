import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { DatabaseModule } from './config/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { Logger } from './logger/logger.service';
import { Module } from '@nestjs/common';
import { StatusModule } from './graphql/modules/status/status.module';
import { UserModule } from './graphql/modules/users/user.module';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: true,
    }),
    StatusModule,
    UserModule,
  ],
  providers: [Logger],
})
export class AppModule {}
