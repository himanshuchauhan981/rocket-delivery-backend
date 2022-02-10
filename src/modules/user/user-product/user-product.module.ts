import { Module } from '@nestjs/common';

import { ProductService } from 'src/modules/product/product.service';
import { UserProductController } from './user-product.controller';
import { UserProductProvider } from './user-product.provider';

@Module({
  controllers: [UserProductController],
  providers: [ProductService, ...UserProductProvider]
})
export class UserProductModule {}
