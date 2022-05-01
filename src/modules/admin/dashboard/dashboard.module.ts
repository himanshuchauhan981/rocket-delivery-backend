import { Module } from '@nestjs/common';

import { DashboardController } from './dashboard.controller';
import { DashboardProvider } from './dashboard.provider';
import { DashboardService } from './dashboard.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, ...DashboardProvider],
})
export class DashboardModule {}
