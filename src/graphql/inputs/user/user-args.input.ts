import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserArgsInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  username?: string;
}
