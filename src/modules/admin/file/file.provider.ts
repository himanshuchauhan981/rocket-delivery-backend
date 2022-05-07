import { Category } from '../../../modules/category/category.entity';
import { Product } from '../../../modules/product/product.entity';
import { SubCategory } from '../../../modules/sub-category/sub-category.entity';
import { File } from './file.entity';
import {
  CATEGORY_REPOSITORY,
  FILE_REPOSITORY,
  PRODUCT_REPOSITORY,
  SUB_CATEGORY_REPOSITORY,
} from '../../../core/constants/repositories';

export const FileProvider = [
  { provide: CATEGORY_REPOSITORY, useValue: Category },
  { provide: FILE_REPOSITORY, useValue: File },
  { provide: SUB_CATEGORY_REPOSITORY, useValue: SubCategory },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
];
