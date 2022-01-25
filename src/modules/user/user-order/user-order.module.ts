import { Module } from '@nestjs/common';

import { OrderService } from 'src/modules/order/order.service';
import { UserOrderController } from './user-order.controller';
import { UserOrderProvider } from './user-order.provider';

@Module({
  controllers: [UserOrderController],
  providers: [OrderService, ...UserOrderProvider]
})
export class UserOrderModule {}
