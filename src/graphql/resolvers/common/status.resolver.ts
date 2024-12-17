import { Query, Resolver } from '@nestjs/graphql';

import { ApiStatus } from '@graphql/types/common/api-status.type';
import { Logger } from '@/logger/logger.service';
import { StatusService } from '@graphql/services/common/status.service';

@Resolver()
export class StatusResolver {
  constructor(
    private statusService: StatusService,
    private readonly logger: Logger,
  ) {}

  @Query(() => ApiStatus)
  async getApiStatus(): Promise<ApiStatus> {
    this.logger.log('Verificando status da API', 'StatusResolver');

    try {
      const status = await this.statusService.getStatus();
      this.logger.debug(
        `Status da API obtido com sucesso: ${JSON.stringify(status)}`,
        'StatusResolver',
      );
      return status;
    } catch (error) {
      this.logger.error(
        'Erro ao obter status da API',
        error.stack,
        'StatusResolver',
      );
      throw error;
    }
  }
}
