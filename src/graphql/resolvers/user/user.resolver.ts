import { Args, Query, Resolver } from '@nestjs/graphql';

import { UserService } from '@graphql/services/user/user.service';
import { UserType } from '@graphql/types/user/user.type';
import { UsersResponse } from '@graphql/types/user/users-response.type';
import { PageArgsInput } from '@graphql/inputs/common/page-args.input';
import { UserArgsInput } from '@graphql/inputs/user/user-args.input';
import { Logger } from '@/logger/logger.service';

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    private userService: UserService,
    private readonly logger: Logger,
  ) {}

  @Query(() => UsersResponse)
  async getUsers(
    @Args('pageArgs', { nullable: true }) pageArgs?: PageArgsInput,
    @Args('filterArgs', { nullable: true }) filterArgs?: UserArgsInput,
  ): Promise<UsersResponse> {
    this.logger.log('Iniciando busca de usuários', 'UserResolver');
    this.logger.debug(
      `Parâmetros recebidos - pageArgs: ${JSON.stringify(pageArgs)}, filterArgs: ${JSON.stringify(filterArgs)}`,
      'UserResolver',
    );

    return this.userService.findAll({ pageArgs, filterArgs });
  }
}
