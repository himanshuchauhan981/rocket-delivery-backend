import {
  CATEGORY_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
  USER_REPOSITORY,
} from '../../../core/constants/repositories';
import { Category } from '../../../modules/category/category.entity';
import { Order } from '../../../modules/order/order.entity';
import { Product } from '../../../modules/product/product.entity';
import { User } from '../../../modules/user/user.entity';

export const DashboardProvider = [
  { provide: USER_REPOSITORY, useValue: User },
  { provide: ORDER_REPOSITORY, useValue: Order },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: CATEGORY_REPOSITORY, useValue: Category },
];
