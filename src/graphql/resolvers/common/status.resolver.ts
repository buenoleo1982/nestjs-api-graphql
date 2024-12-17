import { Query, Resolver } from '@nestjs/graphql';

import { ApiStatus } from '@graphql/types/common/api-status.type';
import { StatusService } from '@graphql/services/common/status.service';

@Resolver()
export class StatusResolver {
  constructor(private statusService: StatusService) {}

  @Query(() => ApiStatus)
  async getApiStatus(): Promise<ApiStatus> {
    return this.statusService.getStatus();
  }
}
