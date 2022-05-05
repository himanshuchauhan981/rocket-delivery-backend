import { Inject, Injectable } from '@nestjs/common';
import * as Razorpay from 'razorpay';

import { MESSAGES } from '../../../core/constants/messages';
import {
  USER_PAYMENT_REPOSITORY,
  USER_REPOSITORY,
} from '../../../core/constants/repositories';
import { STATUS_CODE } from '../../../core/constants/status_code';
import { UserPayment } from '../../../modules/payment/user-payment.entity';
import { User } from '../user.entity';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    @Inject(USER_PAYMENT_REPOSITORY)
    private readonly userPaymentRepository: typeof UserPayment,
  ) {}

  async generateRazorpayOrder(amount: number, user_id: number) {
    try {
      const razorpayInstance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
      });

      const newOrder = await razorpayInstance.orders.create({
        amount: amount * 100,
        currency: 'INR',
      });

      const newPayment = await this.userPaymentRepository.create<any>({
        payment_order_id: newOrder.id,
        status: 'INITIATED',
      });

      const userDetails = await this.userRepository.findByPk(user_id, {
        attributes: ['name', 'email', 'mobile_number'],
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        data: {
          order_id: newOrder.id,
          new_payment_id: newPayment.id,
          key: process.env.RAZORPAY_KEY,
          userDetails,
        },
        message: MESSAGES.SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }
}
