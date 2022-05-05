import { Module } from '@nestjs/common';

import { ProductService } from '../../../modules/product/product.service';
import { SubCategoryService } from '../../../modules/sub-category/sub-category.service';
import { AdminCategoryController } from './category.controller';
import { AdminCategoryProvider } from './category.provider';
import { CategoryService } from './category.service';

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
