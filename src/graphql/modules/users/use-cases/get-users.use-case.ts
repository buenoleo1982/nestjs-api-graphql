import { Injectable } from '@nestjs/common';
import { Logger } from '@/logger/logger.service';
import { PageArgsInput } from '@/graphql/modules/common/types/page-args.input';
import { UserArgsInput } from '../types/user-args.input';
import { UserService } from '../services/user.service';
import { UsersResponse } from '../types/users-response.type';

@Injectable()
export class GetUsersUseCase {
  constructor(
    private userService: UserService,
    private readonly logger: Logger,
  ) {}

  async execute(
    pageArgs?: PageArgsInput,
    filterArgs?: UserArgsInput,
  ): Promise<UsersResponse> {
    this.logger.log('Iniciando busca de usuários', 'GetUsersUseCase');
    this.logger.debug(
      `Parâmetros: pageArgs=${JSON.stringify(pageArgs)}, filterArgs=${JSON.stringify(
        filterArgs,
      )}`,
      'GetUsersUseCase',
    );

    const result = await this.userService.findAll({ pageArgs, filterArgs });

    this.logger.log(
      `Busca finalizada: ${result.nodes.length} usuários encontrados`,
      'GetUsersUseCase',
    );

    return result;
  }
}
