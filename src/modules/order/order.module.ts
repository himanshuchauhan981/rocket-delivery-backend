import { Module } from '@nestjs/common';

import { OrderProvider } from './order.provider';
import { OrderService } from './order.service';

@Module({
  providers: [OrderService, ...OrderProvider]
})
export class OrderModule {}
