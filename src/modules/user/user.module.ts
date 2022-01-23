import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CommonService } from '../common/common.service';
import { UserController } from './user.controller';
import { UserProvider } from './user.provider';
import { UserService } from './user.service';

@Module({
  imports:[JwtModule.register({ secret: 'eyJhbGciOiJIUzI1NiJ9' }),],
  controllers: [UserController],
  providers: [UserService, CommonService, ...UserProvider]
})
export class UserModule {}
