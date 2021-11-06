import Razorpay from 'razorpay';
import sequelize from 'sequelize';

import Common from '../lib/commonFunctions.js';
import ResponseMessages from '../lib/responseMessages.js';
import UserPayments from '../models/userPayments.js';
import Users from '../models/users.js';

export default class PaymentHandler {
	async createRazorpayOrder(payload, userDetails) {
		let common = new Common();
		return new Promise(async (resolve, reject) => {
			try {
				let razorpayData = await common.getRazorPayKeys();

				let razorpayInstance = new Razorpay({
					key_id: razorpayData.razorpayKey,
					key_secret: razorpayData.razorpaySecret,
				});

				let newOrder = await razorpayInstance.orders.create({
					amount: parseFloat(payload.amount) * 100,
					currency: 'INR',
				});

				UserPayments.create({
					payment_order_id: newOrder.id,
				})
					.then(async () => {
						let userData = await Users.findOne({
							where: { id: userDetails.id },
							attributes: ['name', 'email', 'mobile_number'],
						});

						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: {
								key: razorpayData.razorpayKey,
								orderID: newOrder.id,
								userData,
							},
						});
					})
					.catch((err) => {
						reject({
							response: ResponseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}

	captureOrderPayments = (paymentId, totalPrice, paymentOrderId) => {
		totalPrice = totalPrice * 100;
		let common = new Common();
		return new Promise(async (resolve, reject) => {
			try {
				let razorpayData = await common.getRazorPayKeys();

				let razorpayInstance = new Razorpay({
					key_id: razorpayData.razorpayKey,
					key_secret: razorpayData.razorpaySecret,
				});

				let paymentResult = await razorpayInstance.payments.capture(
					paymentId,
					totalPrice
				);

				await UserPayments.update(
					{
						status: 1,
						payment_id: paymentId,
						card_number: paymentResult.card.last4,
						card_type: paymentResult.card.type,
					},
					{ where: { payment_order_id: paymentOrderId } }
				);
				resolve(paymentResult);
			} catch (err) {
				reject(err);
			}
		});
	};

	refundOrderPayments = (paymentId, amount) => {
		return new Promise(async (resolve, reject) => {
			try {
				let common = new Common();

				let razorpayData = await common.getRazorPayKeys();

				let razorpayInstance = new Razorpay({
					key_id: razorpayData.razorpayKey,
					key_secret: razorpayData.razorpaySecret,
				});

				await razorpayInstance.payments.refund(paymentId.trim(), {
					amount,
				});

				await UserPayments.update(
					{
						status: 3,
					},
					{ where: { payment_id: paymentId.trim() } }
				);

				resolve({});
			} catch (err) {
				reject(err);
			}
		});
	};
}
