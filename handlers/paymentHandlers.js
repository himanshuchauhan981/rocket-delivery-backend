const Razorpay = require('razorpay');

const { Users, UserPayments } = require('../models');
const { commonFunctions, responseMessages } = require('../lib');

const paymentHandler = {
	createRazorpayOrder: async (payload, userDetails) => {
		return new Promise(async (resolve, reject) => {
			try {
				let razorpayData = await commonFunctions.getRazorPayKeys();

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
							response: responseMessages.SUCCESS,
							finalData: {
								key: razorpayData.razorpayKey,
								orderID: newOrder.id,
								userData,
							},
						});
					})
					.catch((err) => {
						reject({
							response: responseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: responseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	},

	captureOrderPayments: (paymentId, totalPrice, paymentOrderId) => {
		totalPrice = totalPrice * 100;
		return new Promise(async (resolve, reject) => {
			try {
				let razorpayData = await commonFunctions.getRazorPayKeys();

				let razorpayInstance = new Razorpay({
					key_id: razorpayData.razorpayKey,
					key_secret: razorpayData.razorpaySecret,
				});

				let paymentResult = await razorpayInstance.payments.capture(
					paymentId,
					totalPrice
				);
				console.log('>>>>>>>>>>capture payment', paymentResult);

				await UserPayments.update(
					{ status: 1, payment_id: paymentId },
					{ where: { payment_order_id: paymentOrderId } }
				);
				resolve(paymentResult);
			} catch (err) {
				reject(err);
			}
		});
	},

	refundOrderPayments: (paymentId, amount) => {
		return new Promise(async (resolve, reject) => {
			try {
				let razorpayData = await commonFunctions.getRazorPayKeys();

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
				console.log(err);
				reject(err);
			}
		});
	},
};

module.exports = paymentHandler;
