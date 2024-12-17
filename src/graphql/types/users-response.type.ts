import { Field, ObjectType } from '@nestjs/graphql';

import { PaginationType } from './pagination.type';
import { UserType } from './user.type';

@ObjectType()
export class UsersResponse {
  @Field(() => [UserType])
  nodes: UserType[];

  @Field(() => PaginationType)
  pagination: PaginationType;
}
