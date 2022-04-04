import { Module } from '@nestjs/common';

import { OrderProvider } from './order.provider';
import { OrderService } from './order.service';
import { PaymentService } from '../payment/payment.service';
import { FcmService } from 'src/core/utils/fcm.service';
import { NotificationService } from '../notification/notification.service';
import { SocketsGateway } from 'src/core/sockets/sockets.gateway';

@Module({
  providers: [
    OrderService,
    PaymentService,
    FcmService,
    NotificationService,
    SocketsGateway,
    ...OrderProvider,
  ],
})
export class OrderModule {}
