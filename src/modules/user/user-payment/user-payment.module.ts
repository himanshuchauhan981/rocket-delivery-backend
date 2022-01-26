import { Module } from '@nestjs/common';

import { PaymentService } from 'src/modules/payment/payment.service';
import { UserPaymentController } from './user-payment.controller';
import { UserPaymentProvider } from './user-payment.provider';

@Module({
  controllers: [UserPaymentController],
  providers: [PaymentService, ...UserPaymentProvider]
})
export class UserPaymentModule {}
