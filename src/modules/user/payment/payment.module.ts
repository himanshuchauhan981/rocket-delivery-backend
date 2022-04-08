import { Module } from '@nestjs/common';

import { UserPaymentController } from './payment.controller';
import { UserPaymentProvider } from './payment.provider';
import { PaymentService } from './payment.service';

@Module({
  controllers: [UserPaymentController],
  providers: [PaymentService, ...UserPaymentProvider],
})
export class UserPaymentModule {}
