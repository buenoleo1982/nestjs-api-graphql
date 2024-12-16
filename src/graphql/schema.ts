import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';

@ObjectType()
export class ApiStatus {
  @Field()
  timestamp: string;
}

@Resolver()
export class StatusResolver {
  @Query(() => ApiStatus)
  getApiStatus() {
    return {
      timestamp: new Date().toISOString(),
    };
  }
}
