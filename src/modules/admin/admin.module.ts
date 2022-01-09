import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CommonService } from '../common/common.service';
import { AdminController } from './admin.controller';
import { AdminProvider } from './admin.provider';
import { AdminService } from './admin.service';

@Module({
  imports: [JwtModule.register({ secret: 'eyJhbGciOiJIUzI1NiJ9' })],
  controllers: [AdminController],
  providers: [AdminService, CommonService, ...AdminProvider],
})
export class AdminModule {}
