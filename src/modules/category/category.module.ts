import { Module } from '@nestjs/common';
import { ProductService } from '../product/product.service';

import { SubCategoryService } from '../sub-category/sub-category.service';
import { CategoryProvider } from './category.provider';
import { CategoryService } from './category.service';

@Module({
  controllers: [],
  providers: [
    CategoryService,
    SubCategoryService,
    ProductService,
    ...CategoryProvider,
  ],
})
export class CategoryModule {}
