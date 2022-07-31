import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { MailService } from 'src/core/utils/mail/mail.service';
import { CommonService } from 'src/modules/common/common.service';
import { UserService } from '../user.service';
import { PasswordController } from './password.controller';
import { UserPasswordProvider } from './password.provider';
import { PasswordService } from './password.service';

@Module({
  imports: [JwtModule.register({ secret: 'eyJhbGciOiJIUzI1NiJ9' })],
  controllers: [PasswordController],
  providers: [
    PasswordService,
    MailService,
    CommonService,
    UserService,
    ...UserPasswordProvider,
  ],
})
export class UserPasswordModule {}
