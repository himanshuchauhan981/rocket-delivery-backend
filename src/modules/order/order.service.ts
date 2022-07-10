import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { MESSAGES } from '../../core/constants/messages';

import { ORDER_REPOSITORY } from '../../core/constants/repositories';
import { STATUS_CODE } from '../../core/constants/status_code';
import { Order } from './order.entity';
import { Address } from '../address/address.entity';
import { SpecificOrderResponse } from '../admin/order/interface/response.interface';
import { UserPayment } from '../payment/user-payment.entity';
import { ProductReviewFile } from '../product-review/product-review-file.entity';
import { ProductReview } from '../product-review/product-review.entity';
import { User } from '../user/user.entity';
import { OrderProduct } from './order-product.entity';

@Injectable()
export class CommonOrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
  ) {}

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
