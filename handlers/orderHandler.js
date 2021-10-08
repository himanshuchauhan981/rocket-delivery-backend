const Handlebar = require('handlebars');
const moment = require('moment');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { connection } = require('../db');
const { responseMessages } = require('../lib');
const {
	Orders,
	Address,
	OrderProducts,
	Wishlist,
	Products,
} = require('../models');

const orderHandler = {
	generateNewOrder: async (payload, userDetails) => {
		try {
			let cartItems = payload.cartItems;
			let subTotal = 0;
			let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');

			for (let i = 0; i < cartItems.length; i++) {
				let productQuery =
					'SELECT p.name,pp.actualPrice as price,p.maxQuantity,p.image,pp.discountPercent,pp.discountEndDate,pp.discountStartDate from products p join product_price pp on p.id = pp.productId where p.id = ?';
				let productDetails = await connection.executeQuery(productQuery, [
					cartItems[i].id,
				]);

				let discountStartDate = moment(
					productDetails[i].discountStartDate
				).format('YYYY-MM-DD HH:mm:ss');

				let discountEndDate = moment(productDetails[i].discountEndDate).format(
					'YYYY-MM-DD HH:mm:ss'
				);

				if (
					discountStartDate <= currentDate &&
					discountEndDate >= currentDate
				) {
					let discountPrice =
						(productDetails[0].discountPercent / 100) * productDetails[i].price;
					discountPrice = productDetails[0].price - discountPrice;
					cartItems[i].price = discountPrice;
				} else {
					cartItems[i].price = productDetails[0].price;
				}

				console.log(cartItems[i].price);

				cartItems[i].productName = productDetails[0].name;

				cartItems[i].image = productDetails[0].image;
				subTotal =
					subTotal +
					parseFloat(cartItems[i].price) * parseInt(cartItems[i].quantity, 10);

				if (productDetails[0].maxQuantity < cartItems[i].quantity) {
					let template = Handlebar.compile(
						responseMessages.INSUFFICIENT_QUANTITY.MSG
					);
					let msg = template({ productName: productDetails[i].name });

					return {
						response: {
							STATUS_CODE: responseMessages.INSUFFICIENT_QUANTITY.STATUS_CODE,
							MSG: msg,
						},
						finalData: {},
					};
				}
			}

			let newOrderQuery =
				'INSERT into orders (userId, deliveryCharges, paymentMethod, amount, userAddress, status, netAmount) VALUES (?,?,?,?,?,?,?)';

			let newOrder = await connection.executeQuery(newOrderQuery, [
				userDetails.id,
				payload.deliveryCharges,
				payload.paymentMethod,
				subTotal,
				payload.orderAddress,
				1,
				subTotal + payload.deliveryCharges,
			]);
			let orderId = newOrder.insertId;

			for (let i = 0; i < cartItems.length; i++) {
				let orderProductsQuery =
					'INSERT into order_products (orderId, productId, productName, quantity, price,productImage) VALUES (?,?,?,?,?,?)';
				await connection.executeQuery(orderProductsQuery, [
					orderId,
					cartItems[i].id,
					cartItems[i].productName,
					cartItems[i].quantity,
					cartItems[i].price,
					cartItems[i].image,
				]);

				let updateQuantityQuery =
					'UPDATE products SET maxQuantity = maxQuantity - 1 where id = ?';
				await connection.executeQuery(updateQuantityQuery, [cartItems[i].id]);
			}

			let orderDetailsQuery = 'SELECT createdOn from orders where id = ?';
			let orderDetails = await connection.executeQuery(orderDetailsQuery, [
				orderId,
			]);

			let orderNumber = orderId.toLocaleString('en-US', {
				minimumIntegerDigits: 3,
				useGrouping: false,
			});

			orderNumber = `${orderNumber}-${moment(
				orderDetails[0].createdOn
			).valueOf()}`;

			let deliveryDate = moment(orderDetails[0].createdOn)
				.add(2, 'days')
				.format('YYYY-MM-DD');

			let updateOrderQuery =
				'UPDATE orders SET orderNumber = ?, deliveryDate = ? where id = ?';
			await connection.executeQuery(updateOrderQuery, [
				orderNumber,
				deliveryDate,
				orderId,
			]);

			return { response: { STATUS_CODE: 200, MSG: '' }, finalData: {} };
		} catch (err) {
			throw err;
		}
	},

	addToWishlist: async (payload, userDetails) => {
		try {
			let existingWishlistQuery =
				'SELECT id from wishlist where productId  = ? and userId = ?';
			let existingWishlistItem = await connection.executeQuery(
				existingWishlistQuery,
				[payload.productId, userDetails.id]
			);

			if (existingWishlistItem && existingWishlistItem.length === 0) {
				let newWishlistQuery =
					'INSERT into wishlist (productId,userId) VALUES (?,?)';

				await connection.executeQuery(newWishlistQuery, [
					payload.productId,
					userDetails.id,
				]);
				return { response: responseMessages.NEW_WISHLIST_ITEM, finalData: {} };
			} else {
				return {
					response: responseMessages.EXISTING_WISHLIST_ITEM,
					finalData: {},
				};
			}
		} catch (err) {
			throw err;
		}
	},

	viewUserWishlist: async (userDetails) => {
		return new Promise((resolve, reject) => {
			try {
				Wishlist.findAll({
					where: { [Op.and]: [{ user_id: userDetails.id }, { is_deleted: 0 }] },
					include: [{ model: Products, attributes: ['id', 'name', 'image'] }],
					attributes: ['id', 'product_id'],
				})
					.then((userWishlist) => {
						resolve({
							response: responseMessages.SUCCESS,
							finalData: { userWishlist },
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

	updateUserWishlist: async (userDetails, payload) => {
		return new Promise(async (resolve, reject) => {
			try {
				Wishlist.update(
					{ is_deleted: 1 },
					{
						where: {
							[Op.and]: [
								{ id: payload.wishlistId },
								{ user_id: userDetails.id },
							],
						},
					}
				)
					.then(() => {
						resolve({
							response: responseMessages.REMOVE_WISHLIST_ITEM,
							finalData: {},
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

	getUserOrders: async (userDetails) => {
		return new Promise((resolve, reject) => {
			try {
				Orders.findAll({
					where: { user_id: userDetails.id },
					attributes: [
						'id',
						'order_number',
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
				})
					.then((userOrderDetails) => {
						resolve({
							response: responseMessages.SUCCESS,
							finalData: { userOrderDetails },
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

	specificOrderDetails: async (payload) => {
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
						},
					],
					attributes: [
						'id',
						'payment_method',
						'delivery_charges',
						'amount',
						'net_amount',
						'user_address',
						'created_at',
					],
				}).then((specificOrderDetails) => {
					resolve({
						response: responseMessages.SUCCESS,
						finalData: { orderDetails: specificOrderDetails },
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

	changeOrderStatus: async (payload) => {
		return new Promise((resolve, reject) => {
			try {
				Orders.findAll({
					where: { id: payload.orderId },
					attributes: ['id', 'status'],
				})
					.then(async (orderDetails) => {
						if (orderDetails && orderDetails.length > 0) {
							if (payload.status == 3) {
								if (orderDetails[0].status == 1) {
									await Orders.update(
										{ status: payload.status },
										{ where: { id: payload.orderId } }
									);
									resolve({
										response: responseMessages.ORDER_CANCELLED,
										finalData: {},
									});
								}
							}
						} else {
							reject({
								response: responseMessages.INVALID_ORDER_ID,
								finalData: {},
							});
						}
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

module.exports = orderHandler;
