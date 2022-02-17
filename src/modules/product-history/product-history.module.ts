import { Module } from '@nestjs/common';

import { ProductHistoryProvider } from './product-history.provider';
import { ProductHistoryService } from './product-history.service';

@Module({
  providers: [ProductHistoryService, ...ProductHistoryProvider],
})
export class ProductHistoryModule {}
