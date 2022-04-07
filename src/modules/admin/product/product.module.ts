import { Module } from '@nestjs/common';
import { AdminProductController } from './product.controller';
import { AdminProductProvider } from './product.provider';
import { ProductService } from './product.service';
import { ProductService as CommonProductService } from '../../product/product.service';

@Module({
  controllers: [AdminProductController],
  providers: [ProductService, CommonProductService, ...AdminProductProvider],
})
export class AdminProductModule {}
