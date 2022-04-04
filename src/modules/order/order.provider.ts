import {
  ADMIN_REPOSITORY,
  NOTIFICATION_REPOSITORY,
  NOTIFICATION_USER_REPOSITORY,
  ORDER_PRODUCT_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
  USER_PAYMENT_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { Admin } from '../admin/admin.entity';
import { NotificationUser } from '../notification/entity/notification-user.entity';
import { Notification } from '../notification/notification.entity';
import { UserPayment } from '../payment/user-payment.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { OrderProduct } from './order-product.entity';
import { Order } from './order.entity';

export const OrderProvider = [
  { provide: ORDER_REPOSITORY, useValue: Order },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: ORDER_PRODUCT_REPOSITORY, useValue: OrderProduct },
  { provide: USER_REPOSITORY, useValue: User },
  { provide: USER_PAYMENT_REPOSITORY, useValue: UserPayment },
  { provide: NOTIFICATION_REPOSITORY, useValue: Notification },
  { provide: NOTIFICATION_USER_REPOSITORY, useValue: NotificationUser },
  { provide: ADMIN_REPOSITORY, useValue: Admin },
];
