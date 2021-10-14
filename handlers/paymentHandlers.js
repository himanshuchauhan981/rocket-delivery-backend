const { commonFunctions, responseMessages } = require('../lib');
const Razorpay = require('razorpay');

const { Users, UserPayments } = require('../models');

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
};

module.exports = paymentHandler;
