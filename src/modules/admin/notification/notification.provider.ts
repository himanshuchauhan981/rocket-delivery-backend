import { NOTIFICATION_USER_REPOSITORY } from 'src/core/constants/repositories';
import { NotificationUser } from 'src/modules/notification/entity/notification-user.entity';

export const NotificationProvider = [
  { provide: NOTIFICATION_USER_REPOSITORY, useValue: NotificationUser },
];
