import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import * as moment from 'moment';
import { Parser } from 'json2csv';

import { MESSAGES } from '../../../core/constants/messages';
import {
  ORDER_REPOSITORY,
  USER_REPOSITORY,
} from '../../../core/constants/repositories';
import { STATUS_CODE } from '../../../core/constants/status_code';
import { Order } from '../../../modules/order/order.entity';
import { UserPayment } from '../../../modules/payment/user-payment.entity';
import { User } from '../../../modules/user/user.entity';
import { ApiResponse } from '../dto/interface/admin';
import { UserDetailList, UsersList } from './dto/admin-users.entity';
import {
  DownloadUserCSVResponse,
  ListUsersResponse,
} from './dto/interface/response.interface';
import { RESPONSE_TYPE } from '../../../core/constants/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
  ) {}
  async listUsers(payload: UsersList): Promise<ListUsersResponse> {
    try {
      const pageIndex = payload.pageIndex * payload.pageSize;

      const query: any = [{ is_deleted: 0 }];
      if (payload.search && payload.search !== '') {
        query.push({
          [sequelize.Op.or]: [
            { name: { [sequelize.Op.iLike]: `%${payload.search}%` } },
            { email: { [sequelize.Op.iLike]: `%${payload.search}%` } },
          ],
        });
      }

      const userList = await this.userRepository.findAndCountAll({
        where: { [sequelize.Op.and]: query },
        attributes: [
          'id',
          'name',
          'email',
          'created_at',
          'mobile_number',
          'is_active',
          'profile_image',
        ],
        order: [[payload.sortColumn, payload.sortBy]],
        offset: pageIndex,
        limit: payload.pageSize,
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { userList: userList.rows, count: userList.count },
      };
    } catch (err) {
      throw err;
    }
  }

  async userTransactions(
    user_id: number,
    payload: UserDetailList,
  ): Promise<any> {
    const offset: number = payload.pageIndex * payload.pageSize;

    const userTransactions = await this.orderRepository.findAndCountAll({
      where: { user_id: user_id },
      include: [
        {
          model: UserPayment,
          attributes: [],
          required: true,
        },
      ],
      attributes: [
        [sequelize.col('payment.payment_order_id'), 'payment_order_id'],
        [sequelize.col('payment.payment_id'), 'payment_id'],
        [sequelize.col('payment.status'), 'payment_status'],
        [sequelize.col('payment.card_type'), 'card_type'],
        [sequelize.col('payment.created_at'), 'created_at'],
        [sequelize.col('payment.id'), 'id'],
      ],
      raw: true,
      offset: offset,
      limit: payload.pageSize,
    });

    return {
      statusCode: STATUS_CODE.SUCCESS,
      message: MESSAGES.SUCCESS,
      data: {
        transactions: userTransactions.rows,
        totalTransactions: userTransactions.count,
      },
    };
  }

  async adminUserOrders(user_id: number, payload: UserDetailList) {
    try {
      const offset = payload.pageIndex * payload.pageSize;

      const orderList = await this.orderRepository.findAndCountAll({
        where: { user_id },
        attributes: [
          'id',
          'order_number',
          'net_amount',
          'status',
          'delivery_status',
          'payment_status',
          'created_at',
        ],
        order: [[sequelize.col('created_at'), 'DESC']],
        offset,
        limit: payload.pageSize,
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { orders: orderList.rows, totalOrders: orderList.count },
      };
    } catch (err) {
      throw err;
    }
  }

  async updateUserStatus(id: number, is_active: number): Promise<ApiResponse> {
    try {
      const updatedUser = await this.userRepository.update(
        { is_active },
        { where: { id }, returning: true },
      );

      if (!updatedUser) {
        throw new HttpException(
          MESSAGES.INVALID_USER_ID,
          STATUS_CODE.NOT_FOUND,
        );
      }

      if (updatedUser[1][0].is_active) {
        return {
          statusCode: STATUS_CODE.SUCCESS,
          message: MESSAGES.USER_ENABLED,
        };
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.USER_DISABLED,
      };
    } catch (err) {
      throw err;
    }
  }

  async downloadUsersCSV(): Promise<DownloadUserCSVResponse> {
    try {
      const csvData = [];
      const userList = await this.userRepository.findAll({
        where: { is_deleted: 0 },
      });

      const csvFields = [
        'Name',
        'Email',
        'Mobile Number',
        'Profile Image',
        'Created At',
      ];

      for (const item of userList) {
        csvData.push({
          Name: item.name,
          Email: item.email,
          'Mobile Number': item.mobile_number,
          'Profile Image': item.profile_image,
          'Created At': moment(item.created_at).format('YYYY-MM-DD HH:mm:ss'),
        });
      }

      const csvParser = new Parser({ fields: csvFields });
      const userCSV = csvParser.parse(csvData);

      return {
        responseType: RESPONSE_TYPE.CSV,
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { csv: userCSV },
      };
    } catch (err) {
      throw err;
    }
  }
}
