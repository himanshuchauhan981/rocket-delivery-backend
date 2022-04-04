import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { MESSAGES } from 'src/core/constants/messages';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import {
  ADMIN_REPOSITORY,
  ORDER_PRODUCT_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { File } from '../admin/file/file.entity';
import { ProductPrice } from '../product/product-price.entity';
import { Product } from '../product/product.entity';
import { NewOrder, UpdateOrder } from '../user/order/dto/order.dto';
import { Order } from './order.entity';
import { OrderProduct } from './order-product.entity';
import { PaymentService } from '../payment/payment.service';
import { Address } from '../address/address.entity';
import { UserPayment } from '../payment/user-payment.entity';
import { User } from '../user/user.entity';
import { OrdersList } from '../admin/orders/dto/admin-orders.entity';
import { CONSTANTS, NOTIFICATION_SLUG, ORDER_PAYMENT_STATUS, ORDER_STATUS, USER_TYPE } from 'src/core/constants/constants';
import { FcmService } from 'src/core/utils/fcm.service';
import { ProductReview } from '../product-review/product-review.entity';
import { ProductReviewFile } from '../product-review/product-review-file.entity';
import {
  OrderListResponse,
  SpecificOrderResponse,
} from './dto/order-response.dto';
import { ApiResponse } from '../admin/dto/interface/admin';
import { UserDetailList } from '../admin/users/dto/admin-users.entity';
import { NotificationService } from '../notification/notification.service';
import { Admin } from '../admin/admin.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
    @Inject(ORDER_PRODUCT_REPOSITORY)
    private readonly orderProductRepository: typeof OrderProduct,
    @Inject(ADMIN_REPOSITORY)
    private readonly adminRepository: typeof Admin,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
    private readonly paymentService: PaymentService,
    private readonly fcmService: FcmService,
    private readonly notificationService: NotificationService
  ) {}

  #calculateDiscountPrice(
    start_date: Date,
    end_date: Date,
    discount: number,
    actual_price: number,
    discount_type: string,
  ) {
    const currentDate = moment();
    const discountStartDate = moment(start_date);
    const discountEndDate = moment(end_date);
    let discountStatus;
    let discountPrice;

    if (
      discountStartDate.isAfter(currentDate) &&
      discountEndDate.isAfter(discountStartDate)
    ) {
      discountStatus = true;
      if (discount_type == 'FLAT') {
        discountPrice = actual_price - discount;
      } else {
        discountPrice = (discount / 100) * actual_price;
        discountPrice = actual_price - discountPrice;
      }

      return {
        discountPrice,
        discountStatus,
      };
    } else {
      discountStatus = false;
      discountPrice = 0;
      return { discountStatus, discountPrice };
    }
  }

  async create(payload: NewOrder, user_id: number): Promise<ApiResponse> {
    try {
      let subTotal = 0;
      let orderProducts = [];

      const cartItemsId = payload.cart_items.map((item) => item.id);

      const productDetails = await this.productRepository.findAll({
        where: { id: { [sequelize.Op.in]: cartItemsId } },
        include: [
          {
            model: ProductPrice,
            attributes: [
              'actual_price',
              'discount_start_date',
              'discount_end_date',
              'discount',
              'discount_type',
            ],
          },
          { model: File, attributes: ['id', 'url'] },
        ],
      });

      if (productDetails.length !== cartItemsId.length) {
        throw new HttpException(
          MESSAGES.INVALID_PRODUCT_ID,
          STATUS_CODE.NOT_FOUND,
        );
      }

      for (const item of productDetails) {
        const productPrice = item.product_price;
        let finalProductPrice: number;

        const discountDetails = this.#calculateDiscountPrice(
          productPrice.discount_start_date,
          productPrice.discount_end_date,
          productPrice.discount,
          productPrice.actual_price,
          productPrice.discount_type,
        );

        const cartItemIndex = payload.cart_items.findIndex(
          (cartItem) => cartItem.id == item.id,
        );
        const cartProductQuantity = payload.cart_items[cartItemIndex].quantity;

        if (discountDetails.discountStatus) {
          finalProductPrice = discountDetails.discountPrice;
        } else {
          finalProductPrice = item.product_price.actual_price;
        }

        subTotal = subTotal + finalProductPrice * cartProductQuantity;

        orderProducts.push({
          product_id: item.id,
          product_name: item.name,
          product_image: item.file.url,
          quantity: cartProductQuantity,
          price: finalProductPrice,
        });

        if (item.max_quantity < cartProductQuantity) {
          throw new HttpException(
            MESSAGES.PRODUCT_QUANTITY_NOT_AVAILABLE,
            STATUS_CODE.NOT_FOUND,
          );
        }
      }

      if (payload.payment_method == 1) {
        await this.paymentService.captureOrderPayment(
          payload.payment_id,
          subTotal + payload.delivery_charges,
          payload.payment_order_id,
        );
      }

      const newOrder = await this.orderRepository.create<any>({
        order_number: uuidv4(),
        status: ORDER_STATUS.REQUESTED,
        delivery_charges: 10,
        payment_method: payload.payment_method,
        amount: subTotal,
        net_amount: subTotal + 10,
        user_address: payload.order_address,
        user_id,
        user_payment_id: payload.user_payment_id,
        payment_status: payload.payment_method ? ORDER_PAYMENT_STATUS.PAID : ORDER_PAYMENT_STATUS.UNPAID,
      });

      orderProducts = orderProducts.map((item) => ({
        ...item,
        order_id: newOrder.id,
      }));

      await this.orderProductRepository.bulkCreate(orderProducts);

      const deliveryDate = moment(newOrder.created_at)
        .add(2, 'days')
        .format('YYYY-MM-DD');

      await this.orderRepository.update(
        { delivery_date: deliveryDate },
        { where: { id: newOrder.id } },
      );

      for (const item of orderProducts) {
        await this.productRepository.decrement('max_quantity', {
          by: item.quantity,
          where: { id: item.product_id },
        });
      };

      return { statusCode: STATUS_CODE.SUCCESS, message: MESSAGES.SUCCESS };
    } catch (err) {
      throw err;
    }
  }

  async list(user_id: number): Promise<OrderListResponse> {
    try {
      const orderList = await this.orderRepository.findAll({
        where: { user_id },
        attributes: [
          'id',
          'order_number',
          'payment_method',
          'user_address',
          'delivery_date',
          'created_at',
          'status',
          'net_amount',
        ],
        include: [
          {
            model: OrderProduct,
            attributes: ['id', 'product_name', 'product_image'],
          },
        ],
        order: [['created_at', 'DESC']],
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { orderList },
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

  async cancelOrder(order_id: number, user_id: number, user_role: string): Promise<ApiResponse> {
    const orderDetails = await this.orderRepository.findByPk(order_id);

    if (!orderDetails) {
      throw new HttpException(MESSAGES.INVALID_ORDER_ID, STATUS_CODE.NOT_FOUND);
    }
    // else if (orderDetails.status === ORDER_STATUS.CANCELLED) {
    //   throw new HttpException(
    //     MESSAGES.ORDER_ALREADY_CANCELLED,
    //     STATUS_CODE.BAD_REQUEST,
    //   );
    // }

    if (orderDetails.payment_method == 1) {
      await this.paymentService.refundOrderPayment(
        orderDetails.user_payment_id,
        orderDetails.net_amount * 100,
      );
    }

    const [_, [orderDetail]] = await this.orderRepository.update(
      { status: ORDER_STATUS.CANCELLED },
      { where: { id: order_id } , returning: true },
    );

    const customerDetails = await this.userRepository.findByPk(orderDetail.user_id);

    const adminDetails = await this.adminRepository.findOne({where: { super_admin: 1 }});

    const notificationArgs = {
      sender_id: user_id,
      user_role,
      slug: NOTIFICATION_SLUG.ORDER_CANCELLED,
      receivers: [{
        user_id: adminDetails.id,
        user_type: user_role === USER_TYPE.USER ? USER_TYPE.ADMIN: USER_TYPE.USER,
      }],
      payload: {
        order_number: orderDetail.order_number,
        customer_name: customerDetails.name,
      },
      metadata: {
        order_id,
      }
    };

    await this.notificationService.createNotification(notificationArgs);

    return {
      statusCode: STATUS_CODE.SUCCESS,
      message: MESSAGES.ORDER_CANCELLED_SUCCESS,
    };
  }

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
    }
    catch(err) {
      throw err;
    }
  }
}
