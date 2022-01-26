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
import { NewOrder } from '../user/user-order/dto/order.dto';
import { Order } from './order.entity';
import { OrderProduct } from './order-product.entity';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class OrderService {
	constructor(
		@Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
		@Inject(PRODUCT_REPOSITORY) private readonly productRepository: typeof Product,
		@Inject(ORDER_PRODUCT_REPOSITORY) private readonly orderProductRepository: typeof OrderProduct,
		private readonly paymentService: PaymentService
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
					status: 1,
					delivery_charges: 10,
					payment_method: 0,
					amount: subTotal,
					net_amount: subTotal + 10,
					user_address: payload.order_address,
					user_id,
					payment_id: payload.payment_id,
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
}
