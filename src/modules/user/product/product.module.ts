import { Module } from '@nestjs/common';

import { ProductService } from 'src/modules/product/product.service';
import { UserProductController } from './product.controller';
import { UserProductProvider } from './product.provider';

@Module({
  controllers: [UserProductController],
  providers: [ProductService, ...UserProductProvider],
})
export class UserProductModule {}
