import {
  NOTIFICATION_REPOSITORY,
  NOTIFICATION_USER_REPOSITORY,
  ORDER_REPOSITORY,
  USER_PAYMENT_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { NotificationUser } from '../notification/entity/notification-user.entity';
import { Notification } from '../notification/notification.entity';
import { UserPayment } from '../payment/user-payment.entity';
import { User } from '../user/user.entity';
import { Order } from './order.entity';

export const OrderProvider = [
  { provide: ORDER_REPOSITORY, useValue: Order },
  { provide: USER_REPOSITORY, useValue: User },
  { provide: USER_PAYMENT_REPOSITORY, useValue: UserPayment },
  { provide: NOTIFICATION_REPOSITORY, useValue: Notification },
  { provide: NOTIFICATION_USER_REPOSITORY, useValue: NotificationUser },
];
