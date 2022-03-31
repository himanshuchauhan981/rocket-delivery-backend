import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FcmService } from 'src/core/utils/fcm.service';
import { MailService } from 'src/core/utils/mail/mail.service';

import { CommonService } from 'src/modules/common/common.service';
import { OrderService } from 'src/modules/order/order.service';
import { PaymentService } from 'src/modules/payment/payment.service';
import { UserService } from 'src/modules/user/user.service';
import { AdminUsersController } from './users.controller';
import { AdminUsersProvider } from './users.provider';

@Module({
  imports: [JwtModule.register({ secret: 'eyJhbGciOiJIUzI1NiJ9' })],
  controllers: [AdminUsersController],
  providers: [UserService, CommonService, MailService, OrderService, PaymentService, FcmService, ...AdminUsersProvider],
})
export class AdminUsersModule {}
