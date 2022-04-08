import { Module } from '@nestjs/common';
import { ProductService } from '../product/product.service';

@Module({
  providers: [ProductService],
})
export class CategoryModule {}
