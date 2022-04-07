import { Module } from '@nestjs/common';
import { SocketsGateway } from 'src/core/sockets/sockets.gateway';

import { FcmService } from 'src/core/utils/fcm.service';
import { NotificationService } from 'src/modules/notification/notification.service';
import { PaymentService } from 'src/modules/payment/payment.service';
import { AdminOrdersController } from './order.controller';
import { AdminOrdersProvider } from './order.provider';
import { OrderService } from './order.service';

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
