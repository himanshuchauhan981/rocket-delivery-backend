import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import * as htmlPDF from 'html-pdf';

import {
  CONSTANTS,
  DELIVERY_STATUS,
  ORDER_STATUS,
  RESPONSE_TYPE,
} from '../../../core/constants/constants';
import { MESSAGES } from '../../../core/constants/messages';
import {
  ORDER_REPOSITORY,
  USER_REPOSITORY,
} from '../../../core/constants/repositories';
import { STATUS_CODE } from '../../../core/constants/status_code';
import { FcmService } from '../../../core/utils/fcm.service';
import { OrderListResponse } from '../../../modules/order/dto/order-response.dto';
import { OrderProduct } from '../../../modules/order/order-product.entity';
import { Order } from '../../../modules/order/order.entity';
import { User } from '../../../modules/user/user.entity';
import { ApiResponse } from '../dto/interface/admin';
import { OrdersList, UpdateOrder } from './dto/admin-orders.entity';
import { OrderInvoiceResponse } from './dto/interface/response.interface';
import { orderInvoice } from '../../../core/utils/invoice';
import { Address } from '../../../modules/address/address.entity';

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
          'delivery_status',
        ],
        offset: pageIndex,
        order: [['created_at', 'DESC']],
        limit: query.pageSize,
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

  async updateOrderStatus(
    payload: UpdateOrder,
    id: number,
  ): Promise<ApiResponse> {
    try {
      const uploadPayload = { ...payload };

      if (
        payload.delivery_status &&
        payload.delivery_status === DELIVERY_STATUS.DELIVERED
      ) {
        uploadPayload.status = DELIVERY_STATUS.DELIVERED;
      }

      console.log('>>>>>upload payload', uploadPayload);

      const [status, [orderDetails]] = await this.orderRepository.update<Order>(
        uploadPayload,
        {
          where: { id },
          returning: true,
        },
      );

      if (!status) {
        throw new HttpException(
          MESSAGES.INVALID_ORDER_ID,
          STATUS_CODE.NOT_FOUND,
        );
      }

      console.log('>>>>orderUpdate', orderDetails);

      const userDetails = await this.userRepository.findByPk(
        orderDetails.user_id,
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

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.DELIVERY_STATUS_UPDATE_SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }

  async downloadInvoice(order_id: number): Promise<OrderInvoiceResponse> {
    const orderDetails = await this.orderRepository.findByPk(order_id, {
      include: [
        {
          model: Address,
          attributes: [
            'id',
            'full_name',
            'pincode',
            'house_no',
            'area',
            'city',
            'state',
            'landmark',
            'mobile_number',
          ],
        },
        {
          model: OrderProduct,
          attributes: ['id', 'product_name', 'quantity', 'price'],
        },
      ],
    });

    if (!orderDetails) {
      throw new HttpException(MESSAGES.INVALID_ORDER_ID, STATUS_CODE.NOT_FOUND);
    }

    return new Promise((resolve, reject) => {
      const orderInvoiceHTML = orderInvoice(orderDetails);

      htmlPDF.create(orderInvoiceHTML).toBuffer(function (err, pdfBuffer) {
        if (err) {
          reject(err);
        }
        resolve({
          responseType: RESPONSE_TYPE.BLOB,
          statusCode: STATUS_CODE.SUCCESS,
          message: MESSAGES.SUCCESS,
          data: { pdf: pdfBuffer },
        });
      });
    });
  }
}
