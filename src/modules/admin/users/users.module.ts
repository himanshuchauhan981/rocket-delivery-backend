import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { SocketsGateway } from 'src/core/sockets/sockets.gateway';
import { FcmService } from 'src/core/utils/fcm.service';
import { MailService } from 'src/core/utils/mail/mail.service';
import { CommonService } from 'src/modules/common/common.service';
import { NotificationService } from 'src/modules/notification/notification.service';
import { OrderService } from 'src/modules/order/order.service';
import { PaymentService } from 'src/modules/payment/payment.service';
import { UserService } from 'src/modules/user/user.service';
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
    OrderService,
    PaymentService,
    FcmService,
    NotificationService,
    SocketsGateway,
    ...AdminUsersProvider,
    UsersService,
  ],
})
export class AdminUsersModule {}
