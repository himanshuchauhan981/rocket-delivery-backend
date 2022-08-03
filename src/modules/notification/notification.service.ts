import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import {
  NOTIFICATION_REPOSITORY,
  NOTIFICATION_USER_REPOSITORY,
} from '../../core/constants/repositories';
import { SocketsGateway } from '../../core/sockets/sockets.gateway';
import { User } from '../user/user.entity';
import { NotificationArgs } from './dto/notification.interface';
import { NotificationUser } from './entity/notification-user.entity';
import { Notification } from './entity/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepository: typeof Notification,
    @Inject(NOTIFICATION_USER_REPOSITORY)
    private readonly notificationUserRepository: typeof NotificationUser,
    private readonly socketGateway: SocketsGateway,
  ) {}

  async createNotification(notificationArgs: NotificationArgs): Promise<void> {
    const notificationPayload = {
      user_id: notificationArgs.sender_id,
      user_type: notificationArgs.user_role,
      body: notificationArgs.body,
      notification_template_id: notificationArgs.notification_template_id,
      metadata: notificationArgs.metadata,
    };

    const newNotification = await this.notificationRepository.create<any>(
      notificationPayload,
    );

    const notificationUserList = [];

    for (const item of notificationArgs.receivers) {
      notificationUserList.push({
        notification_id: newNotification.id,
        is_sent: 1,
        is_read: 0,
        ...item,
      });
    }

    await this.notificationUserRepository.bulkCreate(notificationUserList);

    for (const item of notificationArgs.receivers) {
      const notificationDetails = await this.notificationUserRepository.findOne(
        {
          where: {
            [sequelize.Op.and]: [
              { notification_id: newNotification.id },
              { user_type: item.user_type },
              { user_id: item.user_id },
            ],
          },
          include: [
            {
              model: Notification,
              attributes: ['id', 'body', 'metadata', 'notification_type'],
            },
            { model: User, attributes: ['id', 'profile_image'] },
          ],
          attributes: ['id', 'is_read', 'is_sent', 'created_at'],
        },
      );

      this.socketGateway.sendNotification({
        receiver_id: item.user_id,
        receiver_type: item.user_type,
        data: notificationDetails,
      });
    }
  }
}
