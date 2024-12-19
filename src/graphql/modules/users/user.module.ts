import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetUsersUseCase } from './use-cases/get-users.use-case';
import { Logger } from '@/logger/logger.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserResolver,
    UserService,
    CreateUserUseCase,
    GetUsersUseCase,
    Logger,
  ],
})
export class UserModule {}
