import {
  ADMIN_REPOSITORY,
  CATEGORY_REPOSITORY,
  PRODUCT_REPOSITORY,
  SUB_CATEGORY_REPOSITORY,
} from 'src/core/constants/repositories';
import { Category } from '../category/category.entity';
import { Product } from '../product/product.entity';
import { SubCategory } from '../sub-category/sub-category.entity';
import { Admin } from './admin.entity';

export const AdminProvider = [
  { provide: ADMIN_REPOSITORY, useValue: Admin },
  { provide: CATEGORY_REPOSITORY, useValue: Category },
  { provide: SUB_CATEGORY_REPOSITORY, useValue: SubCategory },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
];
