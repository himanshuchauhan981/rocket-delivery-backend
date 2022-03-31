import { Module } from '@nestjs/common';

import { PaymentService } from 'src/modules/payment/payment.service';
import { UserPaymentController } from './payment.controller';
import { UserPaymentProvider } from './payment.provider';

@Module({
  controllers: [UserPaymentController],
  providers: [PaymentService, ...UserPaymentProvider],
})
export class UserPaymentModule {}
