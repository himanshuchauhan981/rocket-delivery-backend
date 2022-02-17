import {
  ORDER_PRODUCT_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
  USER_PAYMENT_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { OrderProduct } from 'src/modules/order/order-product.entity';
import { Order } from 'src/modules/order/order.entity';
import { UserPayment } from 'src/modules/payment/user-payment.entity';
import { Product } from 'src/modules/product/product.entity';
import { User } from '../user.entity';

export const UserOrderProvider = [
  { provide: ORDER_REPOSITORY, useValue: Order },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: ORDER_PRODUCT_REPOSITORY, useValue: OrderProduct },
  { provide: USER_REPOSITORY, useValue: User },
  { provide: USER_PAYMENT_REPOSITORY, useValue: UserPayment },
];
