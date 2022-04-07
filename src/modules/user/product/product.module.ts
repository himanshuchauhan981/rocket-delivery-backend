import { Module } from '@nestjs/common';

import { UserProductController } from './product.controller';
import { UserProductProvider } from './product.provider';
import { ProductService } from './product.service';
import { ProductService as CommonProductService } from '../../product/product.service';

@Module({
  controllers: [UserProductController],
  providers: [ProductService, CommonProductService, ...UserProductProvider],
})
export class UserProductModule {}
