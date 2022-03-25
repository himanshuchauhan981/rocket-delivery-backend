import {
  CATEGORY_REPOSITORY,
  ORDER_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { Category } from 'src/modules/category/category.entity';
import { Order } from 'src/modules/order/order.entity';
import { User } from 'src/modules/user/user.entity';

export const AdminUsersProvider = [
  { provide: USER_REPOSITORY, useValue: User },
  { provide: CATEGORY_REPOSITORY, useValue: Category },
  { provide: ORDER_REPOSITORY, useValue: Order },
];
