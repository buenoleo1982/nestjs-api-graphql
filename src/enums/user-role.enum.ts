/* eslint-disable no-unused-vars */
import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  MANAGER = 'MANAGER',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
