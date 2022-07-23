import { ApiResponse } from 'src/modules/common/interface';
import { NotificationUser } from 'src/modules/notification/entity/notification-user.entity';

interface NotificationListResponse extends ApiResponse {
  data: {
    notifications: NotificationUser[];
  };
}

export { NotificationListResponse };
