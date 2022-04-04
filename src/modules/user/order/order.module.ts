import { Module } from '@nestjs/common';
import { SocketsGateway } from 'src/core/sockets/sockets.gateway';
import { FcmService } from 'src/core/utils/fcm.service';
import { NotificationService } from 'src/modules/notification/notification.service';

import { OrderService } from 'src/modules/order/order.service';
import { PaymentService } from 'src/modules/payment/payment.service';
import { UserOrderController } from './order.controller';
import { UserOrderProvider } from './order.provider';

@Module({
  controllers: [UserOrderController],
  providers: [OrderService, PaymentService, FcmService, NotificationService, SocketsGateway, ...UserOrderProvider],
})
export class UserOrderModule {}
