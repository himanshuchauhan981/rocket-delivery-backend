import { Module } from '@nestjs/common';

import { FcmService } from '../../../core/utils/fcm.service';
import { AdminOrdersController } from './order.controller';
import { AdminOrdersProvider } from './order.provider';
import { OrderService } from './order.service';
import { CommonOrderService } from '../../order/order.service';
import { MailService } from 'src/core/utils/mail/mail.service';

@Module({
  controllers: [AdminOrdersController],
  providers: [
    OrderService,
    FcmService,
    MailService,
    CommonOrderService,
    ...AdminOrdersProvider,
  ],
})
export class AdminOrdersModule {}
