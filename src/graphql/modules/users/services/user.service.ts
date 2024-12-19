import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { User } from '@/graphql/modules/users/entities/user.entity';
import { UsersResponse } from '@/graphql/modules/users/types/users-response.type';
import { PageArgsInput } from '@/graphql/modules/common/types/page-args.input';
import { UserArgsInput } from '@/graphql/modules/users/types/user-args.input';
import { CreateUserInput } from '../types/create-user.input';
import * as argon2 from 'argon2';

interface FindAllArgs {
  pageArgs?: PageArgsInput;
  filterArgs?: UserArgsInput;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll({
    pageArgs,
    filterArgs,
  }: FindAllArgs = {}): Promise<UsersResponse> {
    const { skip = 0, take = 10 } = pageArgs || {};
    const { email, username } = filterArgs || {};

    const queryBuilder = this.userRepository
      .createQueryBuilder('users')
      .where('users.deleted_at IS NULL')
      .andWhere('users.visibility = :visibility', { visibility: true });

    if (email || username) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          if (email) {
            qb.orWhere('users.email ILIKE :email', { email: `%${email}%` });
          }
          if (username) {
            qb.orWhere('users.username ILIKE :username', {
              username: `%${username}%`,
            });
          }
        }),
      );
    }

    const [users, totalCount] = await Promise.all([
      queryBuilder
        .skip(skip)
        .take(take + 1)
        .getMany(),
      queryBuilder.getCount(),
    ]);

    const hasMore = users.length > take;
    if (hasMore) {
      users.pop();
    }

    return {
      nodes: users,
      pagination: {
        totalCount,
        page: Math.floor(skip / take) + 1,
        pageSize: take,
        hasMore,
      },
    };
  }

  async create(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create({
      ...data,
      password: await argon2.hash(data.password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16, // 64MB
        timeCost: 3,
        parallelism: 1,
      }),
      created_at: new Date(),
      updated_at: new Date(),
      last_login: null,
      last_login_ip: null,
      deleted_at: null,
    });

    return this.userRepository.save(user);
  }

  async verifyPassword(hash: string, plain: string): Promise<boolean> {
    return argon2.verify(hash, plain);
  }
}
