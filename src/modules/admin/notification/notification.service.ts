import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { USER_TYPE } from 'src/core/constants/constants';
import { MESSAGES } from 'src/core/constants/messages';
import { NOTIFICATION_USER_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { NotificationUser } from 'src/modules/notification/entity/notification-user.entity';
import { Notification } from 'src/modules/notification/entity/notification.entity';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(NOTIFICATION_USER_REPOSITORY)
    private readonly notificationUserRepository: typeof NotificationUser,
  ) {}

  async notificationList(limit: number) {
    try {
      const notifications = await this.notificationUserRepository.findAll({
        where: {
          [sequelize.Op.and]: [{ user_type: USER_TYPE.ADMIN }, { is_sent: 1 }],
        },
        include: [
          {
            model: Notification,
            attributes: ['id', 'body', 'metadata', 'notification_type'],
          },
          { model: User, attributes: ['id', 'profile_image'] },
        ],
        attributes: ['id', 'is_read', 'is_sent', 'created_at'],
        limit,
        order: [['created_at', 'DESC']],
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { notifications },
      };
    } catch (err) {
      throw err;
    }
  }

  async updateNotificationStatus(id: number, all_read_status: boolean) {
    try {
      if (all_read_status) {
        await this.notificationUserRepository.update(
          { is_read: 1 },
          { where: { user_type: USER_TYPE.ADMIN } },
        );
      } else {
        const [updateStatus] = await this.notificationUserRepository.update(
          { is_read: 1 },
          { where: { id } },
        );

        if (!updateStatus) {
          throw new HttpException(
            MESSAGES.INVALID_NOTIFICATION_USER_ID,
            STATUS_CODE.NOT_FOUND,
          );
        }
      }

      return { statusCode: STATUS_CODE.SUCCESS, message: MESSAGES.SUCCESS };
    } catch (err) {
      throw err;
    }
  }
}
