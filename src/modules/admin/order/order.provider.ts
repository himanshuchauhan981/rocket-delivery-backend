import {
  NOTIFICATION_REPOSITORY,
  NOTIFICATION_TEMPLATE_REPOSITORY,
  NOTIFICATION_USER_REPOSITORY,
  ORDER_REPOSITORY,
  USER_PAYMENT_REPOSITORY,
  USER_REPOSITORY,
} from '../../../core/constants/repositories';
import { NotificationUser } from '../../../modules/notification/entity/notification-user.entity';
import { Notification } from '../../../modules/notification/entity/notification.entity';
import { Order } from '../../../modules/order/order.entity';
import { UserPayment } from '../../../modules/payment/user-payment.entity';
import { User } from '../../../modules/user/user.entity';
import { NotificationTemplate } from '../../../modules/notification/entity/notification-template.entity';

export const AdminOrdersProvider = [
  { provide: ORDER_REPOSITORY, useValue: Order },
  { provide: USER_REPOSITORY, useValue: User },
  { provide: USER_PAYMENT_REPOSITORY, useValue: UserPayment },
  { provide: NOTIFICATION_REPOSITORY, useValue: Notification },
  { provide: NOTIFICATION_USER_REPOSITORY, useValue: NotificationUser },
  { provide: NOTIFICATION_TEMPLATE_REPOSITORY, useValue: NotificationTemplate },
];
