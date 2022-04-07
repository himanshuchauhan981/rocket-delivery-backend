import { Module } from '@nestjs/common';
import { SocketsGateway } from 'src/core/sockets/sockets.gateway';
import { FcmService } from 'src/core/utils/fcm.service';
import { NotificationService } from 'src/modules/notification/notification.service';

import { PaymentService } from 'src/modules/payment/payment.service';
import { UserOrderController } from './order.controller';
import { UserOrderProvider } from './order.provider';
import { OrderService } from './order.service';
import { ProductService as CommonProductService } from '../../product/product.service';
// import {} from ""

@Module({
  controllers: [UserOrderController],
  providers: [
    OrderService,
    PaymentService,
    FcmService,
    NotificationService,
    SocketsGateway,
    CommonProductService,
    ...UserOrderProvider,
  ],
})
export class UserOrderModule {}
