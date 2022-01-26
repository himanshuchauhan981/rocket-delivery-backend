import { Inject, Injectable } from '@nestjs/common';
import * as Razorpay from 'razorpay';

import { MESSAGES } from 'src/core/constants/messages';
import { USER_PAYMENT_REPOSITORY, USER_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { User } from '../user/user.entity';
import { UserPayment } from './user-payment.entity';

@Injectable()
export class PaymentService {
	constructor(
		@Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
		@Inject(USER_PAYMENT_REPOSITORY) private readonly userPaymentRepository: typeof UserPayment
	) {}
  
	async generateRazorpayOrder(amount: number, user_id: number) {
		try{
			const razorpayInstance = new Razorpay({
				key_id: process.env.RAZORPAY_KEY,
				key_secret: process.env.RAZORPAY_SECRET
			});

			let newOrder = await razorpayInstance.orders.create({
				amount: amount * 100,
				currency: 'INR',
			});

			await this.userPaymentRepository.create<any>({ payment_order_id: newOrder.id, status: 0 });

			const userDetails = await this.userRepository.findByPk(user_id, { attributes: ['name', 'email', 'mobile_number'] });

			return {
				statusCode: STATUS_CODE.SUCCESS,
				data:{ order_id: newOrder.id, key: process.env.RAZORPAY_KEY, userDetails },
				message: MESSAGES.SUCCESS
			}
		}
		catch(err) {
			throw err;
		}
	}
}
