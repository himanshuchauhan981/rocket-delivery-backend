import {
  ADMIN_REPOSITORY,
  CATEGORY_REPOSITORY,
  ORDER_REPOSITORY,
  USER_REPOSITORY,
} from '../../../core/constants/repositories';
import { Category } from '../../../modules/category/category.entity';
import { Order } from '../../../modules/order/order.entity';
import { User } from '../../../modules/user/user.entity';
import { Admin } from '../admin.entity';

export const AdminUsersProvider = [
  { provide: USER_REPOSITORY, useValue: User },
  { provide: CATEGORY_REPOSITORY, useValue: Category },
  { provide: ORDER_REPOSITORY, useValue: Order },
  { provide: ADMIN_REPOSITORY, useValue: Admin },
];
