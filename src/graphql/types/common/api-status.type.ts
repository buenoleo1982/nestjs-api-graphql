import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DbStatus {
  @Field()
  type: string;

  @Field()
  version: string;
}

@ObjectType()
export class ApiStatus {
  @Field()
  timestamp: string;

  @Field(() => DbStatus)
  dbStatus: DbStatus;
}
