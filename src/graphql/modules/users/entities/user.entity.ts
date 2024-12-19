import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IsEnum } from 'class-validator';
import { UserRole } from '@/enums/user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  password: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: UserRole.USER,
    transformer: {
      to: (value: UserRole) => value,
      from: (value: string) => value as UserRole,
    },
  })
  @IsEnum(UserRole)
  role: UserRole;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true })
  last_login: Date;

  @Column({ nullable: true })
  last_login_ip: string;

  @Column({ default: true })
  visibility: boolean;

  @Column({ default: false })
  admin: boolean;
}
