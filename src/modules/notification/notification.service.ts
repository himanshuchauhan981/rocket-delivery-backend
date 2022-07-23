import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { NOTIFICATION_SLUG } from '../../core/constants/constants';
import {
  NOTIFICATION_REPOSITORY,
  NOTIFICATION_USER_REPOSITORY,
} from '../../core/constants/repositories';
import { SocketsGateway } from '../../core/sockets/sockets.gateway';
import { User } from '../user/user.entity';
import {
  NotificationArgs,
  NotificationPayload,
} from './dto/notification.interface';
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

  #generateNotification(slug: string, payload: NotificationPayload): string {
    let notificationBody: string;

    switch (slug) {
      case NOTIFICATION_SLUG.ORDER_REQUESTED:
        notificationBody = `${payload.customer_name} had placed an order with order number ${payload.order_number}`;
        break;

      case NOTIFICATION_SLUG.ORDER_CANCELLED:
        notificationBody = `${payload.customer_name} had cancelled order with order number ${payload.order_number}`;
        break;

      default:
        notificationBody = '';
        break;
    }

    return notificationBody;
  }

  async createNotification(notificationArgs: NotificationArgs): Promise<void> {
    const notificationPayload = {
      body: this.#generateNotification(
        notificationArgs.slug,
        notificationArgs.payload,
      ),
      user_id: notificationArgs.sender_id,
      user_type: notificationArgs.user_role,
      metadata: notificationArgs.metadata,
      notification_type: notificationArgs.notification_type,
    };

    const newNotification = await this.notificationRepository.create<any>(
      notificationPayload,
    );

    const notificationUserList = [];

    for (const item of notificationArgs.receivers) {
      notificationUserList.push({
        notification_id: newNotification.id,
        is_sent: 0,
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
