import { NotificationUser } from 'src/modules/notification/entity/notification-user.entity';
import { ApiResponse } from '../../dto/interface/admin';

interface NotificationListResponse extends ApiResponse {
  data: {
    notifications: NotificationUser[];
  };
}

export { NotificationListResponse };