import {
  ADMIN_REPOSITORY,
  NOTIFICATION_REPOSITORY,
  NOTIFICATION_USER_REPOSITORY,
  ORDER_PRODUCT_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
  PRODUCT_REVIEW_REPOSITORY,
  USER_PAYMENT_REPOSITORY,
  USER_REPOSITORY,
} from '../../../core/constants/repositories';
import { Admin } from '../../../modules/admin/admin.entity';
import { NotificationUser } from '../../../modules/notification/entity/notification-user.entity';
import { Notification } from '../../../modules/notification/entity/notification.entity';
import { OrderProduct } from '../../../modules/order/order-product.entity';
import { Order } from '../../../modules/order/order.entity';
import { UserPayment } from '../../../modules/payment/user-payment.entity';
import { Product } from '../../../modules/product/product.entity';
import { ProductReview } from 'src/modules/product-review/product-review.entity';
import { User } from '../user.entity';

export const UserOrderProvider = [
  { provide: ORDER_REPOSITORY, useValue: Order },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: ORDER_PRODUCT_REPOSITORY, useValue: OrderProduct },
  { provide: USER_REPOSITORY, useValue: User },
  { provide: USER_PAYMENT_REPOSITORY, useValue: UserPayment },
  { provide: NOTIFICATION_REPOSITORY, useValue: Notification },
  { provide: NOTIFICATION_USER_REPOSITORY, useValue: NotificationUser },
  { provide: ADMIN_REPOSITORY, useValue: Admin },
  { provide: PRODUCT_REVIEW_REPOSITORY, useValue: ProductReview },
];
