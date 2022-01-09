import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminProvider } from './admin.provider';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, ...AdminProvider],
})
export class AdminModule {}
