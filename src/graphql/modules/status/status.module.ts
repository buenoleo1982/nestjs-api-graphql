import { Logger } from '@/logger/logger.service';
import { Module } from '@nestjs/common';
import { StatusResolver } from './resolvers/status.resolver';
import { StatusService } from './services/status.service';

@Module({
  providers: [StatusResolver, StatusService, Logger],
})
export class StatusModule {}
