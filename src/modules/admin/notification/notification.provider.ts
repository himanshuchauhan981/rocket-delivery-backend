import { NOTIFICATION_USER_REPOSITORY } from '../../../core/constants/repositories';
import { NotificationUser } from '../../../modules/notification/entity/notification-user.entity';

export const NotificationProvider = [
  { provide: NOTIFICATION_USER_REPOSITORY, useValue: NotificationUser },
];
