import {
  NOTIFICATION_REPOSITORY,
  NOTIFICATION_USER_REPOSITORY,
  ORDER_REPOSITORY,
  USER_PAYMENT_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { NotificationUser } from 'src/modules/notification/entity/notification-user.entity';
import { Notification } from 'src/modules/notification/notification.entity';
import { Order } from 'src/modules/order/order.entity';
import { UserPayment } from 'src/modules/payment/user-payment.entity';
import { User } from 'src/modules/user/user.entity';

export const AdminOrdersProvider = [
  { provide: ORDER_REPOSITORY, useValue: Order },
  { provide: USER_REPOSITORY, useValue: User },
  { provide: USER_PAYMENT_REPOSITORY, useValue: UserPayment },
  { provide: NOTIFICATION_REPOSITORY, useValue: Notification },
  { provide: NOTIFICATION_USER_REPOSITORY, useValue: NotificationUser },
];
