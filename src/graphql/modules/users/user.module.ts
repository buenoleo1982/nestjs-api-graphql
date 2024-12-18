import { Logger } from '@/logger/logger.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@graphql/modules/users/entities/user.entity';
import { UserResolver } from '@graphql/modules/users/resolvers/user.resolver';
import { UserService } from '@graphql/modules/users/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService, Logger],
})
export class UserModule {}
