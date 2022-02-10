import { Module } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { ProductProvider } from './product.provider';

@Module({
  providers: [ ProductService, ...ProductProvider],
})
export class CategoryModule {}
