import { Query, Resolver } from '@nestjs/graphql';

import { UserService } from '../services/user.service';
import { UserType } from '../types/user.type';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserType])
  async users(): Promise<UserType[]> {
    return this.userService.findAll();
  }
}
