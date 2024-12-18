import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { User } from '@/graphql/modules/users/entities/user.entity';
import { UsersResponse } from '@/graphql/modules/users/types/users-response.type';
import { PageArgsInput } from '@/graphql/modules/common/types/page-args.input';
import { UserArgsInput } from '@/graphql/modules/users/types/user-args.input';

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

    // Corrigindo a query para usar "users" ao invés de "user"
    const queryBuilder = this.userRepository
      .createQueryBuilder('users')
      .where('users.deleted_at IS NULL')
      .andWhere('users.visibility = :visibility', { visibility: true });

    // Adicionando condições OR para os filtros
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

    // Executando a query principal e a contagem total
    const [users, totalCount] = await Promise.all([
      queryBuilder
        .skip(skip)
        .take(take + 1)
        .getMany(),
      queryBuilder.getCount(),
    ]);

    // Verificando se há mais resultados
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
}
