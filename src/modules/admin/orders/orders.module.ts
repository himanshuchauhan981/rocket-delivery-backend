import { Module } from '@nestjs/common';
import { SocketsGateway } from 'src/core/sockets/sockets.gateway';

import { FcmService } from 'src/core/utils/fcm.service';
import { NotificationService } from 'src/modules/notification/notification.service';
import { OrderService } from 'src/modules/order/order.service';
import { PaymentService } from 'src/modules/payment/payment.service';
import { AdminOrdersController } from './orders.controller';
import { AdminOrdersProvider } from './orders.provider';

@Module({
  controllers: [AdminOrdersController],
  providers: [
    OrderService,
    PaymentService,
    FcmService,
    NotificationService,
    SocketsGateway,
    ...AdminOrdersProvider,
  ],
})
export class AdminOrdersModule {}
