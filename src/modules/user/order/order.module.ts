import { Module } from '@nestjs/common';
import { SocketsGateway } from '../../../core/sockets/sockets.gateway';
import { FcmService } from '../../../core/utils/fcm.service';
import { NotificationService } from '../../../modules/notification/notification.service';

import { PaymentService } from '../../../modules/payment/payment.service';
import { UserOrderController } from './order.controller';
import { UserOrderProvider } from './order.provider';
import { OrderService } from './order.service';
import { ProductService as CommonProductService } from '../../product/product.service';
import { CommonOrderService } from '../../order/order.service';

@Module({
  controllers: [UserOrderController],
  providers: [
    OrderService,
    PaymentService,
    FcmService,
    NotificationService,
    SocketsGateway,
    CommonProductService,
    CommonOrderService,
    ...UserOrderProvider,
  ],
})
export class UserOrderModule {}
