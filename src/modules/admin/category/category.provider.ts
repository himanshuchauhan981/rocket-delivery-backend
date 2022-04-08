import {
  CATEGORY_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
  SUB_CATEGORY_REPOSITORY,
} from 'src/core/constants/repositories';
import { Category } from 'src/modules/category/category.entity';
import { Order } from 'src/modules/order/order.entity';
import { Product } from 'src/modules/product/product.entity';
import { SubCategory } from 'src/modules/sub-category/sub-category.entity';

export const AdminCategoryProvider = [
  { provide: CATEGORY_REPOSITORY, useValue: Category },
  { provide: SUB_CATEGORY_REPOSITORY, useValue: SubCategory },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: ORDER_REPOSITORY, useValue: Order },
];
