import { Module } from '@nestjs/common';

import { ProductHistoryService } from 'src/modules/product-history/product-history.service';
import { ProductService } from 'src/modules/product/product.service';
import { UserProductHistoryController } from './product-history.controller';
import { UserProductHistoryProvider } from './Product-history.provider';

@Module({
  controllers: [UserProductHistoryController],
  providers: [
    ProductHistoryService,
    ProductService,
    ...UserProductHistoryProvider,
  ],
})
export class UserProductHistoryModule {}
