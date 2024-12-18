import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserRole } from '@/enums/user-role.enum';

@ObjectType('User')
export class UserType {
  @Field(() => ID)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field({ name: 'createdAt' })
  created_at: Date;

  @Field({ name: 'updatedAt' })
  updated_at: Date;

  @Field({ name: 'deletedAt', nullable: true })
  deleted_at: Date;

  @Field()
  status: boolean;

  @Field({ name: 'lastLogin' })
  last_login: Date;

  @Field({ name: 'lastLoginIp' })
  last_login_ip: string;

  @Field()
  visibility: boolean;

  @Field()
  admin: boolean;
}
