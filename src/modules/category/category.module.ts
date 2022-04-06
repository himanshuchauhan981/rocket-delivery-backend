import { Module } from '@nestjs/common';
import { ProductService } from '../product/product.service';

import { SubCategoryService } from '../sub-category/sub-category.service';
import { CategoryProvider } from './category.provider';

@Module({
  controllers: [],
  providers: [SubCategoryService, ProductService, ...CategoryProvider],
})
export class CategoryModule {}
