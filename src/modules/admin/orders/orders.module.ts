import { Module } from '@nestjs/common';
import { FcmService } from 'src/core/utils/fcm.service';

import { OrderService } from 'src/modules/order/order.service';
import { PaymentService } from 'src/modules/payment/payment.service';
import { AdminOrdersController } from './orders.controller';
import { AdminOrdersProvider } from './orders.provider';

@Module({
  controllers: [AdminOrdersController],
  providers: [OrderService, PaymentService, FcmService, ...AdminOrdersProvider],
})
export class AdminOrdersModule {}