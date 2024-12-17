import { Query, Resolver } from '@nestjs/graphql';

import { ApiStatus } from '../types/api-status.type';
import { StatusService } from '../services/status.service';

@Resolver()
export class StatusResolver {
  constructor(private statusService: StatusService) {}

  @Query(() => ApiStatus)
  async getApiStatus(): Promise<ApiStatus> {
    return this.statusService.getStatus();
  }
}
