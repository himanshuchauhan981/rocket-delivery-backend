import { ApiProperty } from '@nestjs/swagger';

import { APIResponse } from 'src/modules/common/dto/common.dto';

class Notification {
  @ApiProperty()
  id: number;

  @ApiProperty()
  metadata: any;
}

class NotificationUserProfile {
  @ApiProperty()
  id: number;

  @ApiProperty()
  profile_image: string;
}

class NotificationUser {
  @ApiProperty()
  id: number;

  @ApiProperty()
  is_read: number;

  @ApiProperty()
  is_sent: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  notification: Notification;

  @ApiProperty()
  user: NotificationUserProfile;
}

class NotificationListResponse extends APIResponse {
  @ApiProperty()
  data: { notifications: NotificationUser[] };
}

export { NotificationListResponse };
