import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationType {
  @Field(() => Int, { nullable: false })
  totalCount: number;

  @Field(() => Int, { nullable: false })
  page: number;

  @Field(() => Int, { nullable: false })
  pageSize: number;

  @Field(() => Boolean, { nullable: false })
  hasMore: boolean;
}
