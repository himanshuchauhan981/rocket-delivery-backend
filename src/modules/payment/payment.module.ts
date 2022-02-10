import { Module } from '@nestjs/common';

import { PaymentProvider } from './payment.provider';
import { PaymentService } from './payment.service';

@Module({
  providers: [PaymentService, ...PaymentProvider]
})
export class PaymentModule {}
