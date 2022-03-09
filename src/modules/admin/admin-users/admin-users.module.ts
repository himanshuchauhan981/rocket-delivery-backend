import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CommonService } from 'src/modules/common/common.service';
import { UserService } from 'src/modules/user/user.service';
import { AdminUsersController } from './admin-users.controller';
import { AdminUsersProvider } from './admin-users.provider';

@Module({
  imports: [JwtModule.register({ secret: 'eyJhbGciOiJIUzI1NiJ9' })],
  controllers: [AdminUsersController],
  providers: [UserService, CommonService, ...AdminUsersProvider],
})
export class AdminUsersModule {}
