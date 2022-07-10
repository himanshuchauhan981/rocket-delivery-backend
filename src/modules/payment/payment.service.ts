import { Inject, Injectable } from '@nestjs/common';
import * as Razorpay from 'razorpay';
import { USER_PAYMENT_STATUS } from 'src/core/constants/constants';

import { USER_PAYMENT_REPOSITORY } from '../../core/constants/repositories';
import { UserPayment } from './user-payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(USER_PAYMENT_REPOSITORY)
    private readonly userPaymentRepository: typeof UserPayment,
  ) {}

  async captureOrderPayment(
    payment_id: string,
    total_price: number,
    payment_order_id: string,
  ): Promise<UserPayment[]> {
    total_price = total_price * 100;

    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const paymentResult = await razorpayInstance.payments.capture(
      payment_order_id,
      total_price,
    );

    const [, userPaymentData] = await this.userPaymentRepository.update(
      {
        status: USER_PAYMENT_STATUS.CAPTURED,
        payment_id,
        card_number: paymentResult.card.last4,
        card_type: paymentResult.card.type,
      },
      { where: { payment_order_id: payment_id }, returning: true },
    );

    return userPaymentData;
  }

  async refundOrderPayment(
    user_payment_id: number,
    amount: number,
  ): Promise<void> {
    try {
      const paymentDetails = await this.userPaymentRepository.findByPk(
        user_payment_id,
      );

      const razorpayInstance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
      });

      await razorpayInstance.payments.refund(paymentDetails.payment_id, {
        amount,
      });

      await this.userPaymentRepository.update(
        { status: USER_PAYMENT_STATUS.REFUNDED },
        { where: { payment_id: paymentDetails.payment_id } },
      );
    } catch (err) {
      throw err;
    }
  }
}
