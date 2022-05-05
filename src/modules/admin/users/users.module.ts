import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { MailService } from '../../../core/utils/mail/mail.service';
import { CommonService } from '../../../modules/common/common.service';
import { UserService } from '../../../modules/user/user.service';
import { AdminUsersController } from './users.controller';
import { AdminUsersProvider } from './users.provider';
import { UsersService } from './users.service';

@Module({
  imports: [JwtModule.register({ secret: 'eyJhbGciOiJIUzI1NiJ9' })],
  controllers: [AdminUsersController],
  providers: [
    UserService,
    CommonService,
    MailService,
    ...AdminUsersProvider,
    UsersService,
  ],
})
export class AdminUsersModule {}
