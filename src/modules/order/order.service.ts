import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { MESSAGES } from 'src/core/constants/messages';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { ORDER_PRODUCT_REPOSITORY, ORDER_REPOSITORY, PRODUCT_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { File } from '../admin/file/file.entity';
import { ProductPrice } from '../product/product-price.entity';
import { Product } from '../product/product.entity';
import { NewOrder, UpdateOrder } from '../user/user-order/dto/order.dto';
import { Order } from './order.entity';
import { OrderProduct } from './order-product.entity';
import { PaymentService } from '../payment/payment.service';
import { Address } from '../address/address.entity';
import { UserPayment } from '../payment/user-payment.entity';
import { User } from '../user/user.entity';
import { OrdersList } from '../admin/admin-orders/dto/admin-orders.entity';
import { CONSTANTS } from 'src/core/constants/constants';
import { FcmService } from 'src/core/utils/fcm.service';

@Injectable()
export class OrderService {
	constructor(
		@Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
		@Inject(PRODUCT_REPOSITORY) private readonly productRepository: typeof Product,
		@Inject(ORDER_PRODUCT_REPOSITORY) private readonly orderProductRepository: typeof OrderProduct,
		private readonly paymentService: PaymentService,
		private readonly fcmService: FcmService
	) {}

	#calculateDiscountPrice(
		start_date: Date,
		end_date: Date,
		discount: number,
		actual_price: number,
		discount_type: string
	) {
		let currentDate = moment();
		let discountStartDate = moment(start_date);
		let discountEndDate = moment(end_date);
		let discountStatus;
		let discountPrice;

		if (discountStartDate.isAfter(currentDate) && discountEndDate.isAfter(discountStartDate)) {
			discountStatus = true;
			if (discount_type == 'FLAT') {
				discountPrice = actual_price - discount;
			} else {
				discountPrice = (discount / 100) * actual_price;
				discountPrice = actual_price - discountPrice;
			}

			return {
				discountPrice,
				discountStatus,
			};
		} else {
			discountStatus = false;
			discountPrice = 0;
			return { discountStatus, discountPrice };
		}
	}


	async create(payload: NewOrder, user_id: number) {
		try{
			let subTotal = 0;

			let cartItemsId = payload.cart_items.map((item) => item.id);

			let orderProducts = [];

			const productDetails = await this.productRepository.findAll({
				where: { id: { [sequelize.Op.in]: cartItemsId } },
				include: [
					{ model: ProductPrice, attributes: ['actual_price', 'discount_start_date', 'discount_end_date', 'discount', 'discount_type'] },
					{ model: File, attributes: ['id', 'url'] },
				],
			});

			if(productDetails.length !== cartItemsId.length) {
				throw new HttpException(MESSAGES.INVALID_PRODUCT_ID, STATUS_CODE.NOT_FOUND);
			}
			else {
				for(const item of productDetails) {
					const productPrice = item.product_price;
					let finalProductPrice: number;
					
					const discountDetails = this.#calculateDiscountPrice(
						productPrice.discount_start_date,
						productPrice.discount_end_date,
						productPrice.discount,
						productPrice.actual_price,
						productPrice.discount_type
					);
					
					let cartItemIndex = payload.cart_items.findIndex((cartItem) => cartItem.id == item.id);
					const cartProductQuantity = payload.cart_items[cartItemIndex].quantity;

					if(discountDetails.discountStatus) {
						finalProductPrice = discountDetails.discountPrice;
					}
					else {
						finalProductPrice = item.product_price.actual_price;
					}

					subTotal = subTotal + (finalProductPrice * cartProductQuantity);

					orderProducts.push({ product_id: item.id, product_name: item.name, product_image: item.file.url, quantity: cartProductQuantity, price: finalProductPrice });

					if(item.max_quantity < cartProductQuantity) {
						throw new HttpException(MESSAGES.PRODUCT_QUANTITY_NOT_AVAILABLE, STATUS_CODE.NOT_FOUND);
					}
				}

				if (payload.payment_method == 1) {
					await this.paymentService.captureOrderPayment(payload.payment_id, subTotal + payload.delivery_charges, payload.payment_order_id);
				}

				let newOrder = await this.orderRepository.create<any>({
					order_number: uuidv4(),
					status: 'REQUESTED',
					delivery_charges: 10,
					payment_method: payload.payment_method,
					amount: subTotal,
					net_amount: subTotal + 10,
					user_address: payload.order_address,
					user_id,
					user_payment_id: payload.user_payment_id,
				});

				orderProducts = orderProducts.map(item => ({...item, order_id: newOrder.id }));

				await this.orderProductRepository.bulkCreate(orderProducts);

				let deliveryDate = moment(newOrder.created_at).add(2, 'days').format('YYYY-MM-DD');

				await this.orderRepository.update(
					{ delivery_date: deliveryDate },
					{ where:{ id: newOrder.id } }
				);

				for(const item of orderProducts) {
					await this.productRepository.decrement('max_quantity',{ by: item.quantity, where:{ id: item.product_id } })
				}
				
				return { statusCode: STATUS_CODE.SUCCESS, message: MESSAGES.SUCCESS };
			}
		}
		catch(err) {
			throw err;
		}
	}

	async list(user_id: number) {
		try {
			const orderList = await this.orderRepository.findAll({
				where: { user_id },
				attributes: ['id', 'order_number', 'payment_method', 'user_address', 'delivery_date', 'created_at', 'status', 'net_amount'],
				include: [
					{model: OrderProduct, attributes: ['id', 'product_name', 'product_image']}
				],
				order: [['created_at', 'DESC']],
			});

			return { statusCode: STATUS_CODE.SUCCESS, message: STATUS_CODE.SUCCESS, data: { orderList } };
		}
		catch(err) {
			throw err;
		}
	}

	async findOneById(order_id: number) {
		let orderDetails = await this.orderRepository.findByPk(
			order_id,
			{ 
				include: [
					{ 
						model: Address,
						attributes: [
							'id',
							'full_name',
							'house_no',
							'area',
							'city',
							'state',
							'landmark',
							'country_code',
							'mobile_number',
							'pincode',
							'latitude',
							'longitude',
							'country_code'
						]
					},
					{ model: OrderProduct, attributes: ['id', 'product_id', 'product_name', 'product_image', 'price', 'quantity'] },
					{ model: UserPayment, attributes: ['status', 'card_number', 'card_type'] },
					{ model: User, attributes: ['id', 'name', 'email', 'mobile_number'] }
				],
				attributes: [
					'id',
					'status',
					'payment_method',
					'delivery_charges',
					'amount',
					'net_amount',
					'created_at',
					'delivery_status',
					'payment_status',
					'order_number',
				]
			}
		);

		//Product review join

		if(!orderDetails) {
			throw new HttpException(MESSAGES.INVALID_ORDER_ID, STATUS_CODE.NOT_FOUND);
		}
		else {
			return { statusCode: STATUS_CODE.SUCCESS, message: STATUS_CODE.SUCCESS, data: { orderDetails } };
		}
	}
	
	async cancelOrder(id: number) {
		const orderDetails = await this.orderRepository.findByPk(id);

		if(!orderDetails) {
			throw new HttpException(MESSAGES.INVALID_ORDER_ID, STATUS_CODE.NOT_FOUND);
		}
		else if(orderDetails.status == 'CANCELLED') {
			throw new HttpException(MESSAGES.ORDER_ALREADY_REFUNDED, STATUS_CODE.BAD_REQUEST);
		}
		else {
			if (orderDetails.payment_method == 1) {
				await this.paymentService.refundOrderPayment(orderDetails.user_payment_id, orderDetails.net_amount * 100);
			}
			await this.orderRepository.update(
				{ status: 'CANCELLED' },
				{ where: { id } }
			);

			return { statusCode: STATUS_CODE.SUCCESS, message: MESSAGES.ORDER_CANCELLED_SUCCESS };
		}
	}

	async adminOrderList(query: OrdersList) {
		try {
			const pageIndex = query.pageIndex * query.pageSize;
			const orderDetails = await this.orderRepository.findAndCountAll({
				where: {},
				include: [
					{ model: User, attributes: ['id','name'] },
					{ model: OrderProduct, attributes: ['id'] },
				],
				attributes: ['id', 'order_number', 'status', 'net_amount', 'payment_method', 'created_at', 'payment_status'],
				offset: pageIndex,
				order: [['created_at','DESC']],
				limit: query.pageSize
			});

			return {
				statusCode: STATUS_CODE.SUCCESS,
				message: MESSAGES.SUCCESS,
				data: { orderDetails: orderDetails.rows, totalOrders: orderDetails.count }
			};
		}
		catch(err) {
			throw err;
		}
	}

	async updateOrderStatus(payload: UpdateOrder, id: number) {
		try {
			const orderUpdateStatus = await this.orderRepository.update(payload,{ where: { id } });
			const orderDetails = await this.orderRepository.findByPk(
				id, 
				{ include:[{ model: User, attributes:['id', 'fcm_token'] }] }
			);

			const deviceIds = [orderDetails.user.fcm_token];
			const notificationPayload = {
				notification: {
					title: 'Test title',
					body: 'Test body'
				}
			};

			await this.fcmService.sendNotification(deviceIds, notificationPayload, false);

			if(orderUpdateStatus[0]) {
				if(CONSTANTS.ORDER_STATUS in payload) {
					return {
						statusCode: STATUS_CODE.SUCCESS,
						message: payload.status == CONSTANTS.CONFIRMED ?
							MESSAGES.ORDER_CONFIRMED_SUCCESS: payload.status == CONSTANTS.DELIVERED ?
								MESSAGES.ORDER_DELIVERED_SUCCESS : MESSAGES.ORDER_CANCELLED_SUCCESS
					};
				}
				else if(CONSTANTS.PAYMENT_STATUS in payload) {
					return { statusCode: STATUS_CODE.SUCCESS, message: MESSAGES.PAYMENT_STATUS_UPDATE_SUCCESS };
				}
			}
			else {
				throw new HttpException(MESSAGES.INVALID_ORDER_ID, STATUS_CODE.NOT_FOUND);
			}
		}
		catch(err) {
			throw err;
		}
	}
}
