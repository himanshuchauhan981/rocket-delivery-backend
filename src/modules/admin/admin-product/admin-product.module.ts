import { Module } from '@nestjs/common';
import { ProductService } from 'src/modules/product/product.service';
import { AdminProductController } from './admin-product.controller';
import { AdminProductProvider } from './admin-product.provider';

@Module({
  controllers: [AdminProductController],
  providers: [ProductService, ...AdminProductProvider],
})
export class AdminProductModule {}
