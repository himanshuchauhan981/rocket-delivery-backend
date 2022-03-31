import { Module } from '@nestjs/common';
import { FcmService } from 'src/core/utils/fcm.service';

import { OrderService } from 'src/modules/order/order.service';
import { PaymentService } from 'src/modules/payment/payment.service';
import { UserOrderController } from './order.controller';
import { UserOrderProvider } from './order.provider';

@Module({
  controllers: [UserOrderController],
  providers: [OrderService, PaymentService, FcmService, ...UserOrderProvider],
})
export class UserOrderModule {}
