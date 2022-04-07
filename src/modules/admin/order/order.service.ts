import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { CONSTANTS, ORDER_STATUS } from 'src/core/constants/constants';
import { MESSAGES } from 'src/core/constants/messages';
import {
  ORDER_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { FcmService } from 'src/core/utils/fcm.service';
import { Address } from 'src/modules/address/address.entity';
import { OrderProduct } from 'src/modules/order/order-product.entity';
import { Order } from 'src/modules/order/order.entity';
import { UserPayment } from 'src/modules/payment/user-payment.entity';
import { ProductReviewFile } from 'src/modules/product-review/product-review-file.entity';
import { ProductReview } from 'src/modules/product-review/product-review.entity';
import { User } from 'src/modules/user/user.entity';
import { ApiResponse } from '../dto/interface/admin';
import { OrdersList, UpdateOrder } from './dto/admin-orders.entity';
import {
  OrderListResponse,
  SpecificOrderResponse,
} from './dto/interface/response.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
    private readonly fcmService: FcmService,
  ) {}

  async adminOrderList(query: OrdersList): Promise<OrderListResponse> {
    try {
      const pageIndex = query.pageIndex * query.pageSize;
      const defaultQuery = [];

      if (query.startDate && query.endDate) {
        defaultQuery.push({
          created_at: {
            [sequelize.Op.lte]: query.endDate,
            [sequelize.Op.gte]: query.startDate,
          },
        });
      } else if (query.paymentStatus) {
        defaultQuery.push({
          payment_status: query.paymentStatus,
        });
      } else if (query.orderNumber) {
        defaultQuery.push({
          order_number: { [sequelize.Op.like]: '%' + query.orderNumber + '%' },
        });
      }

      const ordersList = await this.orderRepository.findAndCountAll({
        where: { [sequelize.Op.and]: defaultQuery },
        include: [
          { model: User, attributes: ['id', 'name'] },
          { model: OrderProduct, attributes: ['id'] },
        ],
        attributes: [
          'id',
          'order_number',
          'status',
          'net_amount',
          'payment_method',
          'created_at',
          'payment_status',
        ],
        offset: pageIndex,
        order: [['created_at', 'DESC']],
        limit: query.pageSize,
        // distinct: true,
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: {
          orderList: ordersList.rows,
          totalOrders: ordersList.count,
        },
      };
    } catch (err) {
      throw err;
    }
  }

  async findOneById(order_id: number): Promise<SpecificOrderResponse> {
    try {
      const orderDetails = await this.orderRepository.findByPk(order_id, {
        include: [
          {
            model: Address,
            attributes: [
              'id',
              'full_name',
              'house_no',
              'area',
              'city',
              'state',
              'landmark',
              'country_code',
              'mobile_number',
              'pincode',
              'latitude',
              'longitude',
              'country_code',
            ],
          },
          {
            model: OrderProduct,
            attributes: [
              'id',
              'product_id',
              'product_name',
              'product_image',
              'price',
              'quantity',
            ],
          },
          {
            model: UserPayment,
            attributes: ['status', 'card_number', 'card_type'],
          },
          { model: User, attributes: ['id', 'name', 'email', 'mobile_number'] },
          {
            model: ProductReview,
            where: { [sequelize.Op.and]: [{ order_id }, { is_deleted: 0 }] },
            attributes: ['id', 'headline', 'opinion', 'ratings', 'product_id'],
            required: false,
            include: [{ model: ProductReviewFile, attributes: ['id', 'url'] }],
          },
        ],
        attributes: [
          'id',
          'status',
          'payment_method',
          'delivery_charges',
          'amount',
          'net_amount',
          'created_at',
          'delivery_status',
          'payment_status',
          'order_number',
        ],
      });

      if (!orderDetails) {
        throw new HttpException(
          MESSAGES.INVALID_ORDER_ID,
          STATUS_CODE.NOT_FOUND,
        );
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { orderDetails },
      };
    } catch (err) {
      throw err;
    }
  }

  async updateOrderStatus(
    payload: UpdateOrder,
    id: number,
  ): Promise<ApiResponse> {
    try {
      const orderUpdateStatus = await this.orderRepository.update<Order>(
        payload,
        {
          where: { id },
          returning: true,
        },
      );

      if (!orderUpdateStatus[0]) {
        throw new HttpException(
          MESSAGES.INVALID_ORDER_ID,
          STATUS_CODE.NOT_FOUND,
        );
      }

      const userDetails = await this.userRepository.findByPk(
        orderUpdateStatus[1][0].user_id,
      );

      const deviceIds = [userDetails.fcm_token];
      const notificationPayload = {
        notification: {
          title: 'Test title',
          body: 'Test body',
        },
      };

      await this.fcmService.sendNotification(
        deviceIds,
        notificationPayload,
        false,
      );

      if (!orderUpdateStatus[0]) {
        throw new HttpException(
          MESSAGES.INVALID_ORDER_ID,
          STATUS_CODE.NOT_FOUND,
        );
      }

      if (CONSTANTS.ORDER_STATUS in payload) {
        return {
          statusCode: STATUS_CODE.SUCCESS,
          message:
            payload.status == ORDER_STATUS.CONFIRMED
              ? MESSAGES.ORDER_CONFIRMED_SUCCESS
              : payload.status == ORDER_STATUS.DELIVERED
              ? MESSAGES.ORDER_DELIVERED_SUCCESS
              : MESSAGES.ORDER_CANCELLED_SUCCESS,
        };
      } else if (CONSTANTS.PAYMENT_STATUS in payload) {
        return {
          statusCode: STATUS_CODE.SUCCESS,
          message: MESSAGES.PAYMENT_STATUS_UPDATE_SUCCESS,
        };
      }
    } catch (err) {
      throw err;
    }
  }
}
