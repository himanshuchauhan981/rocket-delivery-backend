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
};

module.exports = orderHandler;
