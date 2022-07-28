import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import * as htmlPDF from 'html-pdf';

import {
  CONSTANTS,
  DELIVERY_STATUS,
  NOTIFICATION_TEMPLATE_SLUG,
  ORDER_STATUS,
  RESPONSE_TYPE,
} from '../../../core/constants/constants';
import { MESSAGES } from '../../../core/constants/messages';
import {
  NOTIFICATION_TEMPLATE_REPOSITORY,
  ORDER_REPOSITORY,
  USER_REPOSITORY,
} from '../../../core/constants/repositories';
import { STATUS_CODE } from '../../../core/constants/status_code';
import { FcmService } from '../../../core/utils/fcm.service';
import { OrderListResponse } from '../../order/interface/response.interface';
import { OrderProduct } from '../../../modules/order/order-product.entity';
import { Order } from '../../../modules/order/order.entity';
import { User } from '../../../modules/user/user.entity';
import { OrdersList, UpdateOrder } from './dto/admin-orders.entity';
import { orderInvoice } from '../../../core/utils/invoice';
import { Address } from '../../../modules/address/address.entity';
import { NotificationTemplate } from '../../../modules/notification/entity/notification-template.entity';
import { OrderInvoiceResponse } from './dto/admin-orders-response.dto';
import { APIResponse } from 'src/modules/common/dto/common.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
    private readonly fcmService: FcmService,
    @Inject(NOTIFICATION_TEMPLATE_REPOSITORY)
    private readonly notificationTemplateRepository: typeof NotificationTemplate,
  ) {}

  async #generateOrderNotifications(
    key: string,
    status: string,
  ): Promise<NotificationTemplate> {
    let slug: string;

    if (key === 'status') {
      switch (status) {
        case ORDER_STATUS.REQUESTED:
          slug = NOTIFICATION_TEMPLATE_SLUG.ORDER_REQUESTED;
          break;

        case ORDER_STATUS.CONFIRMED:
          slug = NOTIFICATION_TEMPLATE_SLUG.ORDER_CONFIRMED;
          break;

        case ORDER_STATUS.DELIVERED:
          slug = NOTIFICATION_TEMPLATE_SLUG.ORDER_DELIVERED;
          break;

        case ORDER_STATUS.CANCELLED:
          slug = NOTIFICATION_TEMPLATE_SLUG.ORDER_CANCELLED;
          break;
      }
    } else {
      switch (status) {
        case DELIVERY_STATUS.CONFIRMED:
          slug = NOTIFICATION_TEMPLATE_SLUG.DELIVERY_CONFIRMED;
          break;

        case DELIVERY_STATUS.PICKED:
          slug = NOTIFICATION_TEMPLATE_SLUG.DELIVERY_PICKED;
          break;

        case DELIVERY_STATUS.ON_THE_WAY:
          slug = NOTIFICATION_TEMPLATE_SLUG.DELIVERY_ON_THE_WAY;
          break;

        case DELIVERY_STATUS.DELIVERED:
          slug = NOTIFICATION_TEMPLATE_SLUG.DELIVERY_COMPLETED;
          break;
      }
    }

    return this.notificationTemplateRepository.findOne({ where: { slug } });
  }

  async adminOrderList(query: OrdersList): Promise<OrderListResponse> {
    try {
      const page = query.page * query.limit;
      const defaultQuery = [];

      if (query.start_date && query.end_date) {
        defaultQuery.push({
          created_at: {
            [sequelize.Op.lte]: query.end_date,
            [sequelize.Op.gte]: query.start_date,
          },
        });
      } else if (query.payment_status) {
        defaultQuery.push({
          payment_status: query.payment_status,
        });
      } else if (query.order_number) {
        defaultQuery.push({
          order_number: { [sequelize.Op.like]: '%' + query.order_number + '%' },
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
        offset: page,
        order: [['created_at', 'DESC']],
        limit: query.limit,
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
  ): Promise<APIResponse> {
    try {
      const uploadPayload = { ...payload };

      if (
        payload.delivery_status &&
        payload.delivery_status === DELIVERY_STATUS.DELIVERED
      ) {
        uploadPayload.status = DELIVERY_STATUS.DELIVERED;
      }

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

      const [key] = Object.keys(uploadPayload);

      if (key === 'status' || key === 'delivery_status') {
        const [payloadStatus] = Object.values(uploadPayload);

        const userDetails = await this.userRepository.findByPk(
          orderDetails.user_id,
        );

        const notificationTemplateDetails =
          await this.#generateOrderNotifications(key, payloadStatus);

        const deviceIds = [userDetails.fcm_token];

        const notificationPayload = {
          notification: {
            title: notificationTemplateDetails.title,
            body: notificationTemplateDetails.body,
          },
        };

        await this.fcmService.sendNotification(
          deviceIds,
          notificationPayload,
          false,
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
            // 'city',
            // 'state',
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
