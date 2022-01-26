import { Module } from '@nestjs/common';

import { OrderProvider } from './order.provider';
import { OrderService } from './order.service';
import { PaymentService } from '../payment/payment.service';

@Module({
  providers: [OrderService, PaymentService, ...OrderProvider]
})
export class OrderModule {}
