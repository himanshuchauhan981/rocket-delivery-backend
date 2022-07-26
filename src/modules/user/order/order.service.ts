import { HttpException, Inject, Injectable } from '@nestjs/common';
import moment from 'moment';
import sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import {
  ORDER_STATUS,
  ORDER_PAYMENT_STATUS,
  NOTIFICATION_SLUG,
  USER_TYPE,
  NOTIFICATION_TYPE,
  PAYMENT_STATUS,
} from '../../../core/constants/constants';
import { MESSAGES } from '../../../core/constants/messages';
import {
  ADMIN_REPOSITORY,
  ORDER_PRODUCT_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
  USER_REPOSITORY,
} from '../../../core/constants/repositories';
import { STATUS_CODE } from '../../../core/constants/status_code';
import { File } from '../../../modules/admin/file/file.entity';
import { OrderProduct } from '../../../modules/order/order-product.entity';
import { Order } from '../../../modules/order/order.entity';
import { PaymentService } from '../../../modules/payment/payment.service';
import { ProductPrice } from '../../../modules/product/product-price.entity';
import { Product } from '../../../modules/product/product.entity';
import { NewOrder } from './dto/order.dto';
import { ProductService as CommonProductService } from '../../product/product.service';
import { Admin } from '../../../modules/admin/admin.entity';
import { User } from '../user.entity';
import { NotificationService } from '../../../modules/notification/notification.service';
import { OrderListResponse } from '../../order/interface/response.interface';
import { ApiResponse } from 'src/modules/common/interface';

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
    private readonly commonProductService: CommonProductService,
    private readonly notificationService: NotificationService,
  ) {}

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

        const discountDetails =
          this.commonProductService.calculateDiscountPrice(
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

      if (payload.payment_method == PAYMENT_STATUS.CARD) {
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
        payment_status: payload.payment_method
          ? ORDER_PAYMENT_STATUS.PAID
          : ORDER_PAYMENT_STATUS.UNPAID,
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
      }

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

  async cancelOrder(
    order_id: number,
    user_id: number,
    user_role: string,
  ): Promise<ApiResponse> {
    const orderDetails = await this.orderRepository.findByPk(order_id);

    if (!orderDetails) {
      throw new HttpException(MESSAGES.INVALID_ORDER_ID, STATUS_CODE.NOT_FOUND);
    } else if (orderDetails.status === ORDER_STATUS.CANCELLED) {
      throw new HttpException(
        MESSAGES.ORDER_ALREADY_CANCELLED,
        STATUS_CODE.BAD_REQUEST,
      );
    }

    if (orderDetails.payment_method === PAYMENT_STATUS.CARD) {
      await this.paymentService.refundOrderPayment(
        orderDetails.user_payment_id,
        orderDetails.net_amount * 100,
      );
    }

    const [, [orderDetail]] = await this.orderRepository.update(
      { status: ORDER_STATUS.CANCELLED },
      { where: { id: order_id }, returning: true },
    );

    const customerDetails = await this.userRepository.findByPk(
      orderDetail.user_id,
    );

    const adminDetails = await this.adminRepository.findOne({
      where: { super_admin: 1 },
    });

    const notificationArgs = {
      notification_type: NOTIFICATION_TYPE.ORDER_CANCEL,
      sender_id: user_id,
      user_role,
      slug: NOTIFICATION_SLUG.ORDER_CANCELLED,
      receivers: [
        {
          user_id: adminDetails.id,
          user_type:
            user_role === USER_TYPE.USER ? USER_TYPE.ADMIN : USER_TYPE.USER,
        },
      ],
      payload: {
        order_number: orderDetail.order_number,
        customer_name: customerDetails.name,
      },
      metadata: {
        order_id,
      },
    };

    await this.notificationService.createNotification(notificationArgs);

    return {
      statusCode: STATUS_CODE.SUCCESS,
      message: MESSAGES.ORDER_CANCELLED_SUCCESS,
    };
  }
}
