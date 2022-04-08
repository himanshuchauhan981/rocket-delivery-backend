import { Module } from '@nestjs/common';

import { OrderProvider } from './order.provider';

@Module({
  providers: [...OrderProvider],
})
export class OrderModule {}
