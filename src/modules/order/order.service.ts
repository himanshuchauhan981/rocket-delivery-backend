import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { MESSAGES } from 'src/core/constants/messages';

import { ORDER_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { Order } from './order.entity';
import { UserDetailList } from '../admin/users/dto/admin-users.entity';
import { Address } from '../address/address.entity';
import { SpecificOrderResponse } from '../admin/order/dto/interface/response.interface';
import { UserPayment } from '../payment/user-payment.entity';
import { ProductReviewFile } from '../product-review/product-review-file.entity';
import { ProductReview } from '../product-review/product-review.entity';
import { User } from '../user/user.entity';
import { OrderProduct } from './order-product.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
  ) {}

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
}
