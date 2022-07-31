import {
  ADMIN_REPOSITORY,
  CATEGORY_REPOSITORY,
  ORDER_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { Admin } from 'src/modules/admin/admin.entity';
import { Category } from 'src/modules/category/category.entity';
import { Order } from 'src/modules/order/order.entity';
import { User } from '../user.entity';

export const UserPasswordProvider = [
  { provide: USER_REPOSITORY, useValue: User },
  { provide: CATEGORY_REPOSITORY, useValue: Category },
  { provide: ADMIN_REPOSITORY, useValue: Admin },
  { provide: ORDER_REPOSITORY, useValue: Order },
];
