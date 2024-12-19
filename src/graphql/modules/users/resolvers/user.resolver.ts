import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { UserType } from '../types/user.type';
import { UsersResponse } from '../types/users-response.type';
import { PageArgsInput } from '@/graphql/modules/common/types/page-args.input';
import { UserArgsInput } from '../types/user-args.input';
import { CreateUserInput } from '../types/create-user.input';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { GetUsersUseCase } from '../use-cases/get-users.use-case';

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUsersUseCase: GetUsersUseCase,
  ) {}

  @Query(() => UsersResponse)
  async getUsers(
    @Args('pageArgs', { nullable: true }) pageArgs?: PageArgsInput,
    @Args('filterArgs', { nullable: true }) filterArgs?: UserArgsInput,
  ): Promise<UsersResponse> {
    return this.getUsersUseCase.execute(pageArgs, filterArgs);
  }

  @Mutation(() => UserType)
  async createUser(@Args('data') data: CreateUserInput): Promise<UserType> {
    return this.createUserUseCase.execute(data);
  }
}
