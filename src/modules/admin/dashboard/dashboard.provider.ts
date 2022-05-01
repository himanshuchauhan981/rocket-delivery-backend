import {
  CATEGORY_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { Category } from 'src/modules/category/category.entity';
import { Order } from 'src/modules/order/order.entity';
import { Product } from 'src/modules/product/product.entity';
import { User } from 'src/modules/user/user.entity';

export const DashboardProvider = [
  { provide: USER_REPOSITORY, useValue: User },
  { provide: ORDER_REPOSITORY, useValue: Order },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: CATEGORY_REPOSITORY, useValue: Category },
];
