import { Module } from '@nestjs/common';

import { OrderService } from 'src/modules/order/order.service';
import { PaymentService } from 'src/modules/payment/payment.service';
import { AdminOrdersController } from './admin-orders.controller';
import { AdminOrdersProvider } from './admin-orders.provider';

@Module({
  controllers: [AdminOrdersController],
  providers: [OrderService, PaymentService, ...AdminOrdersProvider]
})
export class AdminOrdersModule {}
