import {
  NOTIFICATION_REPOSITORY,
  NOTIFICATION_USER_REPOSITORY,
} from '../../core/constants/repositories';
import { NotificationUser } from './entity/notification-user.entity';
import { Notification } from './entity/notification.entity';

export const NotificationProvider = [
  { provide: NOTIFICATION_REPOSITORY, useValue: Notification },
  { provide: NOTIFICATION_USER_REPOSITORY, useValue: NotificationUser },
];
