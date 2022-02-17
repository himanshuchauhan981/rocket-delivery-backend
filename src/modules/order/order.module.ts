import { Module } from '@nestjs/common';

import { OrderProvider } from './order.provider';
import { OrderService } from './order.service';
import { PaymentService } from '../payment/payment.service';
import { FcmService } from 'src/core/utils/fcm.service';

@Module({
  providers: [OrderService, PaymentService, FcmService, ...OrderProvider],
})
export class OrderModule {}
