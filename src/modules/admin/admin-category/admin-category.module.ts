import { Module } from '@nestjs/common';

import { CategoryService } from 'src/modules/category/category.service';
import { ProductService } from 'src/modules/product/product.service';
import { SubCategoryService } from 'src/modules/sub-category/sub-category.service';
import { AdminCategoryController } from './admin-category.controller';
import { AdminCategoryProvider } from './admin-category.provider';

@Module({
  controllers: [AdminCategoryController],
  providers: [
    CategoryService,
    SubCategoryService,
    ProductService,
    ...AdminCategoryProvider,
  ],
})
export class AdminCategoryModule {}
