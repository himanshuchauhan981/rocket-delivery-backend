const { connection } = require('../db');
const Handlebar = require('handlebars');
const { responseMessages } = require('../lib');

const orderHandler = {
	generateNewOrder: async (payload, userDetails) => {
		try {
			let cartItems = payload.cartItems;
			let subTotal = 0;

			for (let i = 0; i < cartItems.length; i++) {
				let productQuery =
					'SELECT name, price,maxQuantity from products where id = ?';
				let productDetails = await connection.executeQuery(productQuery, [
					cartItems[i].id,
				]);

				cartItems[i].productName = productDetails[0].name;
				cartItems[i].price = productDetails[0].price;
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
				'INSERT into orders (userId, deliveryCharges, paymentMethod, amount, userAddress) VALUES (?,?,?,?,?)';

			let newOrder = await connection.executeQuery(newOrderQuery, [
				userDetails.id,
				payload.deliveryCharges,
				payload.paymentMethod,
				subTotal,
				payload.orderAddress,
			]);
			let orderId = newOrder.insertId;

			for (let i = 0; i < cartItems.length; i++) {
				let orderProductsQuery =
					'INSERT into order_products (orderId, productId, productName, quantity, price) VALUES (?,?,?,?,?)';
				await connection.executeQuery(orderProductsQuery, [
					orderId,
					cartItems[i].id,
					cartItems[i].productName,
					cartItems[i].quantity,
					cartItems[i].price,
				]);

				let updateQuantityQuery =
					'UPDATE products SET maxQuantity = maxQuantity - 1 where id = ?';
				await connection.executeQuery(updateQuantityQuery, [cartItems[i].id]);
			}

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
		try {
			let userWishlistQuery =
				'SELECT wl.id, wl.productId, p.name, p.image FROM wishlist wl join products p on p.id = wl.productId WHERE wl.userId = ? and wl.isDeleted= ?';
			let userWishlist = await connection.executeQuery(userWishlistQuery, [
				userDetails.id,
				0,
			]);

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { userWishlist },
			};
		} catch (err) {
			throw err;
		}
	},

	updateUserWishlist: async (userDetails, payload) => {
		try {
			let updateWishlistQuery =
				'UPDATE wishlist SET isDeleted = ? where id = ? and userid  = ?';
			await connection.executeQuery(updateWishlistQuery, [
				1,
				payload.wishlist,
				userDetails.id,
			]);
			return {
				response: responseMessages.REMOVE_WISHLIST_ITEM,
				finalData: {},
			};
		} catch (err) {
			throw err;
		}
	},

	getUserOrders: async (userDetails) => {
		try {
			let orderDetailsQuery =
				'SELECT id, orderNumber,status, netAmount, paymentMethod, userAddress, deliveryDate, createdOn from orders o where userId = ? ORDER BY createdOn DESC';
			let userOrderDetails = await connection.executeQuery(orderDetailsQuery, [
				userDetails.id,
			]);

			for (let i = 0; i < userOrderDetails.length; i++) {
				let orderProductsQuery =
					'SELECT p.image,p.id from order_products op join orders o on o.id = op.orderId join products p on p.id = op.productId where o.id = ?';
				let orderProducts = await connection.executeQuery(orderProductsQuery, [
					userOrderDetails[i].id,
				]);
				userOrderDetails[i].orderProducts = orderProducts;
			}

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { userOrderDetails },
			};
		} catch (err) {
			throw err;
		}
	},

	specificOrderDetails: async (payload) => {
		try {
			let specificOrderQuery =
				'SELECT o.id, a.fullName, a.houseNo, a.area, a.city, a.state, a.landmark, a.countryCode, a.mobileNumber, o.paymentMethod, o.deliveryCharges, o.amount, o.userAddress, o.deliveryDate, o.createdOn from orders o join address a on a.id = o.userAddress where o.id = ?';

			let specificOrderDetails = await connection.executeQuery(
				specificOrderQuery,
				[payload.orderId]
			);

			for (let i = 0; i < specificOrderDetails.length; i++) {
				let orderProductsQuery =
					'select id, productId, productName,productImage, price, quantity, price from order_products where orderId = ?';

				let orderProductsDetails = await connection.executeQuery(
					orderProductsQuery,
					[payload.orderId]
				);
				specificOrderDetails[i].orderProducts = orderProductsDetails;
			}

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { orderDetails: specificOrderDetails[0] },
			};
		} catch (err) {
			throw err;
		}
	},
};

module.exports = orderHandler;
