import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

import { UserRole } from '@/enums/user-role.enum';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field(() => UserRole, { defaultValue: UserRole.USER })
  role?: UserRole;

  @Field({ defaultValue: true })
  status?: boolean;

  @Field({ defaultValue: true })
  visibility?: boolean;

  @Field({ defaultValue: false })
  admin?: boolean;
}
