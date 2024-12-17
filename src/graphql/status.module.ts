import { Module } from '@nestjs/common';
import { StatusResolver } from './resolvers/common/status.resolver';
import { StatusService } from './services/common/status.service';

@Module({
  providers: [StatusResolver, StatusService],
})
export class StatusModule {}
