import { Module } from '@nestjs/common';

import { ProductService } from 'src/modules/product/product.service';
import { UserProductHistoryController } from './product-history.controller';
import { UserProductHistoryProvider } from './Product-history.provider';
import { ProductHistoryService } from './product-history.service';

@Module({
  controllers: [UserProductHistoryController],
  providers: [
    ProductHistoryService,
    ProductService,
    ...UserProductHistoryProvider,
  ],
})
export class UserProductHistoryModule {}
