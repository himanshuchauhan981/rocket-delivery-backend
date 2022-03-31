import {
  CATEGORY_REPOSITORY,
  ORDER_PRODUCT_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
  USER_PAYMENT_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { Category } from 'src/modules/category/category.entity';
import { OrderProduct } from 'src/modules/order/order-product.entity';
import { Order } from 'src/modules/order/order.entity';
import { UserPayment } from 'src/modules/payment/user-payment.entity';
import { Product } from 'src/modules/product/product.entity';
import { User } from 'src/modules/user/user.entity';

export const AdminUsersProvider = [
  { provide: USER_REPOSITORY, useValue: User },
  { provide: CATEGORY_REPOSITORY, useValue: Category },
  { provide: ORDER_REPOSITORY, useValue: Order },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: ORDER_PRODUCT_REPOSITORY, useValue: OrderProduct },
  { provide: USER_PAYMENT_REPOSITORY, useValue: UserPayment },
];
