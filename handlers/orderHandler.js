import moment from 'moment';
import Handlebar from 'handlebars';
import sequelize from 'sequelize';

import Products from '../models/products.js';
import ProductPrice from '../models/productPrice.js';
import OrderProducts from '../models/orderProducts.js';
import Orders from '../models/orders.js';
import Common from '../lib/commonFunctions.js';
import ResponseMessages from '../lib/responseMessages.js';
import PaymentHandler from './paymentHandlers.js';
import ProductReview from '../models/productReview.js';
import ProductReviewImages from '../models/productReviewImages.js';
import Address from '../models/userAddress.js';
import UserPayments from '../models/userPayments.js';
import Users from '../models/users.js';

class OrderHandler {
	async generateNewOrder(payload, userDetails) {
		let common = new Common();
		let paymentHandler = new PaymentHandler();
		return new Promise((resolve, reject) => {
			try {
				let cartItems = payload.cartItems;
				let subTotal = 0;

				let cartItemsId = cartItems.map((item) => item.id);
				Products.findAll({
					where: { id: { [sequelize.Op.in]: cartItemsId } },
					include: [{ model: ProductPrice, attributes: [] }],
					attributes: [
						'id',
						'name',
						'image',
						[sequelize.col('max_quantity'), 'maxQuantity'],
						[sequelize.col('product_price.actual_price'), 'price'],
						[
							sequelize.col('product_price.discount_percent'),
							'discountPercent',
						],
						[
							sequelize.col('product_price.discount_end_date'),
							'discountEndDate',
						],
						[
							sequelize.col('product_price.discount_start_date'),
							'discountStartDate',
						],
					],
					raw: true,
				})
					.then(async (productDetails) => {
						for (let i = 0; i < productDetails.length; i++) {
							let discountDetails = await common.calculateDiscountPrice(
								productDetails[i].discountStartDate,
								productDetails[i].discountEndDate,
								productDetails[i].discountPercent,
								productDetails[i].price
							);

							let cartItemIndex = cartItems.findIndex(
								(item) => item.id == productDetails[i].id
							);

							if (discountDetails.discountStatus) {
								cartItems[cartItemIndex].price = discountDetails.discountPrice;
							} else {
								cartItems[cartItemIndex].price = productDetails[i].price;
							}

							cartItems[cartItemIndex].productName = productDetails[i].name;
							cartItems[cartItemIndex].image = productDetails[i].image;

							subTotal =
								subTotal +
								parseFloat(cartItems[i].price) *
									parseInt(cartItems[i].quantity, 10);

							if (
								productDetails[i].maxQuantity <
								cartItems[cartItemIndex].quantity
							) {
								let template = Handlebar.compile(
									ResponseMessages.INSUFFICIENT_QUANTITY.MSG
								);
								let msg = template({ productName: productDetails[i].name });

								resolve({
									response: {
										STATUS_CODE:
											ResponseMessages.INSUFFICIENT_QUANTITY.STATUS_CODE,
										MSG: msg,
									},
									finalData: {},
								});
							}
						}

						if (payload.paymentMethod == 1) {
							await paymentHandler.captureOrderPayments(
								payload.paymentId,
								subTotal + payload.deliveryCharges,
								payload.paymentOrderId
							);
						}

						let newOrder = await Orders.create({
							user_id: userDetails.id,
							delivery_charges: payload.deliveryCharges,
							payment_method: payload.paymentMethod,
							amount: subTotal,
							user_address: payload.orderAddress,
							status: 1,
							net_amount: subTotal + payload.deliveryCharges,
							payment_id: payload.paymentId,
						});

						let orderId = newOrder.id;
						for (let i = 0; i < cartItems.length; i++) {
							await OrderProducts.create({
								order_id: orderId,
								product_id: cartItems[i].id,
								product_name: cartItems[i].productName,
								quantity: cartItems[i].quantity,
								price: cartItems[i].price,
								product_image: cartItems[i].image,
							});

							await Products.decrement('max_quantity', {
								by: 1,
								where: { id: cartItems[i].id },
							});
						}

						let orderDetails = await Orders.findOne({
							where: { id: orderId },
							attributes: ['created_at'],
						});

						let orderNumber = orderId.toLocaleString('en-US', {
							minimumIntegerDigits: 3,
							useGrouping: false,
						});

						orderNumber = `${orderNumber}-${moment(
							orderDetails.created_at
						).valueOf()}`;

						let deliveryDate = moment(orderDetails.created_at)
							.add(2, 'days')
							.format('YYYY-MM-DD');

						await Orders.update(
							{
								order_number: orderNumber,
								delivery_date: deliveryDate,
							},
							{ where: { id: orderId } }
						);

						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: {},
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

	async getUserOrders(userDetails) {
		return new Promise((resolve, reject) => {
			try {
				Orders.findAll({
					where: { user_id: userDetails.id },
					attributes: [
						'id',
						[sequelize.col('order_number'), 'orderNumber'],
						'net_amount',
						'payment_method',
						'user_address',
						'delivery_date',
						'created_at',
						'status',
					],
					include: [
						{
							model: OrderProducts,
							attributes: ['id', 'product_name', 'product_image'],
						},
					],
					order: [['created_at', 'DESC']],
				})
					.then((userOrderDetails) => {
						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: { userOrderDetails },
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

	async specificOrderDetails(payload) {
		return new Promise((resolve, reject) => {
			try {
				Orders.findOne({
					where: { id: payload.orderId },
					include: [
						{
							model: Address,
							attributes: [
								'full_name',
								'house_no',
								'area',
								'city',
								'state',
								'landmark',
								'country_code',
								'mobile_number',
							],
						},
						{
							model: OrderProducts,
							attributes: [
								'id',
								'product_id',
								'product_name',
								'product_image',
								'price',
								'quantity',
							],
							include: {
								model: ProductReview,
								on: {
									col1: sequelize.where(
										sequelize.col('order_products.product_id'),
										'=',
										sequelize.col('order_products.product_review.product_id')
									),
									col2: sequelize.where(
										sequelize.col('order_products.product_review.is_deleted'),
										'=',
										0
									),
								},
								attributes: [
									'id',
									'headline',
									'opinion',
									'ratings',
									'is_deleted',
								],
							},
						},
						{
							model: UserPayments,
							attributes: ['status', 'card_number', 'card_type'],
						},
					],
					attributes: [
						'id',
						'status',
						'payment_method',
						'delivery_charges',
						'amount',
						'net_amount',
						'user_address',
						'created_at',
					],
				}).then(async (specificOrderDetails) => {
					let order_products = specificOrderDetails.order_products;
					for (let i = 0; i < order_products.length; i++) {
						if (order_products[i].product_review != null) {
							let review_id = order_products[i].product_review.id;
							let review_images = await ProductReviewImages.findAll({
								where: {
									[Op.and]: [{ review_id: review_id }, { is_deleted: 0 }],
								},
								attributes: ['id', 'image'],
							});
							specificOrderDetails.order_products[
								i
							].product_review.review_images = review_images;
						}
					}

					resolve({
						response: ResponseMessages.SUCCESS,
						finalData: { orderDetails: specificOrderDetails },
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

	async changeOrderStatus(payload) {
		const paymentHandler = new PaymentHandler();
		const common = new Common();
		return new Promise((resolve, reject) => {
			try {
				Orders.findOne({
					where: { id: payload.orderId },
					attributes: [
						'id',
						'status',
						'payment_method',
						'payment_id',
						'net_amount',
					],
					include: [
						{ model: Users, attributes: ['id', 'fcm_token'], raw: true },
					],
				})
					.then(async (orderDetails) => {
						if (orderDetails) {
							if (payload.status == 3) {
								if (orderDetails.status == 1) {
									if (orderDetails.payment_method == 1) {
										await paymentHandler.refundOrderPayments(
											orderDetails.payment_id,
											parseFloat(orderDetails.net_amount) * 100
										);
										const fcm_token = orderDetails.user.fcm_token;

										let notification_data = {
											title: 'Order',
											body: 'Your order has been cancelled',
										};

										await common.sendFcmPushNofication(
											fcm_token,
											notification_data
										);
									}
									await Orders.update(
										{ status: payload.status },
										{ where: { id: payload.orderId } }
									);
									resolve({
										response: ResponseMessages.ORDER_CANCELLED,
										finalData: {},
									});
								}
							}
						} else {
							reject({
								response: ResponseMessages.INVALID_ORDER_ID,
								finalData: {},
							});
						}
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
}

export default OrderHandler;
