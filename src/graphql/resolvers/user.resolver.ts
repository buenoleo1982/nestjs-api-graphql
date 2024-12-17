import { Args, Query, Resolver } from '@nestjs/graphql';

import { UserService } from '../services/user.service';
import { UserType } from '../types/user.type';

import { UsersResponse } from '../types/users-response.type';
import { PageArgsInput } from '../inputs/page-args.input';
import { UserArgsInput } from '../inputs/user-args.input';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UsersResponse)
  async getUsers(
    @Args('pageArgs', { nullable: true }) pageArgs?: PageArgsInput,
    @Args('filterArgs', { nullable: true }) filterArgs?: UserArgsInput,
  ): Promise<UsersResponse> {
    return this.userService.findAll({ pageArgs, filterArgs });
  }
}
