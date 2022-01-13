import {
  CATEGORY_REPOSITORY,
  PRODUCT_REPOSITORY,
  SUB_CATEGORY_REPOSITORY,
} from 'src/core/constants/repositories';
import { Product } from '../product/product.entity';
import { SubCategory } from '../sub-category/sub-category.entity';
import { Category } from './category.entity';

export const CategoryProvider = [
  { provide: CATEGORY_REPOSITORY, useValue: Category },
  { provide: SUB_CATEGORY_REPOSITORY, useValue: SubCategory },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
];
