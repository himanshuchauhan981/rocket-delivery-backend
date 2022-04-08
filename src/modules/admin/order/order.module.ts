import { Module } from '@nestjs/common';

import { FcmService } from 'src/core/utils/fcm.service';
import { AdminOrdersController } from './order.controller';
import { AdminOrdersProvider } from './order.provider';
import { OrderService } from './order.service';
import { CommonOrderService } from '../../order/order.service';

@Module({
  controllers: [AdminOrdersController],
  providers: [
    OrderService,
    FcmService,
    CommonOrderService,
    ...AdminOrdersProvider,
  ],
})
export class AdminOrdersModule {}
