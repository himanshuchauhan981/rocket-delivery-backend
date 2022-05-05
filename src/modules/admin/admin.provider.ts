import {
  ADDRESS_REPOSITORY,
  ADMIN_REPOSITORY,
  CATEGORY_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
  SUB_CATEGORY_REPOSITORY,
  USER_REPOSITORY,
} from '../../core/constants/repositories';
import { Address } from '../address/address.entity';
import { Category } from '../category/category.entity';
import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';
import { SubCategory } from '../sub-category/sub-category.entity';
import { User } from '../user/user.entity';
import { Admin } from './admin.entity';

export const AdminProvider = [
  { provide: ADMIN_REPOSITORY, useValue: Admin },
  { provide: CATEGORY_REPOSITORY, useValue: Category },
  { provide: SUB_CATEGORY_REPOSITORY, useValue: SubCategory },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: ORDER_REPOSITORY, useValue: Order },
  { provide: ADDRESS_REPOSITORY, useValue: Address },
  { provide: USER_REPOSITORY, useValue: User },
];
