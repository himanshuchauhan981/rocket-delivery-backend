import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { MESSAGES } from 'src/core/constants/messages';
import {
  ORDER_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { CommonService } from 'src/modules/common/common.service';
import { Order } from 'src/modules/order/order.entity';
import { UserPayment } from 'src/modules/payment/user-payment.entity';
import { User } from 'src/modules/user/user.entity';
import { ApiResponse } from '../dto/interface/admin';
import { UserDetailList, UsersList } from './dto/admin-users.entity';
import { ListUsersResponse } from './dto/interface/response.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
    private readonly commonService: CommonService,
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
}
