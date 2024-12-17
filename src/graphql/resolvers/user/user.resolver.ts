import { Args, Query, Resolver } from '@nestjs/graphql';

import { UserService } from '@graphql/services/user/user.service';
import { UserType } from '@graphql/types/user/user.type';
import { UsersResponse } from '@graphql/types/user/users-response.type';
import { PageArgsInput } from '@graphql/inputs/common/page-args.input';
import { UserArgsInput } from '@graphql/inputs/user/user-args.input';

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
