import { Module } from '@nestjs/common';
import { StatusResolver } from './resolvers/status.resolver';
import { StatusService } from './services/status.service';

@Module({
  providers: [StatusResolver, StatusService],
})
export class StatusModule {}
