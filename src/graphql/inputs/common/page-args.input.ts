import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PageArgsInput {
  @Field(() => Int, { nullable: false })
  skip: number;

  @Field(() => Int, { nullable: false })
  take: number;
}
