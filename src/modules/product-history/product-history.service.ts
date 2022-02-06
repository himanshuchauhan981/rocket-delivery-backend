import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import * as moment from 'moment';

import { MESSAGES } from 'src/core/constants/messages';
import { PRODUCT_HISTORY_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { File } from '../admin/file/file.entity';
import { ProductPrice } from '../product/product-price.entity';
import { Product } from '../product/product.entity';
import { NewProductHistory } from '../user/user-product-history/dto/product-history.dto';
import { ProductHistory } from './product-history.entity';

@Injectable()
export class ProductHistoryService {

  constructor(@Inject(PRODUCT_HISTORY_REPOSITORY) private readonly productHistoryRepository: typeof ProductHistory) {}

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

		if (discountStartDate.isBefore(currentDate) && discountEndDate.isAfter(discountStartDate)) {
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

  async create(payload: NewProductHistory, user_id: number) {
    try {
      const existingProductHistory = await this.productHistoryRepository.findOne({
        where: { [sequelize.Op.and]: [{ user_id }, { product_id: payload.product_id }, { is_deleted: 0 }] }
      });
      
      if(existingProductHistory) {
        await this.productHistoryRepository.increment(
          { view_count: +1 },
          { where: { [sequelize.Op.and]: [{ user_id }, { product_id: payload.product_id }] } }
        );
      }
      else {
        await this.productHistoryRepository.create<any>({
          product_id: payload.product_id,
          user_id: user_id,
        });
      }

      return { statusCode: STATUS_CODE.SUCCESS, message: MESSAGES.SUCCESS };
    }
    catch(err) {
      throw err;
    }
  }

  async list(user_id: number, most_viewed_History: boolean) {
    try {
      const productHistoryList = await this.productHistoryRepository.findAll({
        where: { [sequelize.Op.and]: [{ user_id }, { is_deleted: 0 }] },
        include: [
          { 
            model: Product,
            attributes: ['id', 'name'],
            include: [
              { model: ProductPrice, attributes: ['actual_price', 'discount', 'discount_type', 'discount_start_date', 'discount_end_date'] },
              { model: File, attributes: ['id', 'url'] }
            ],
          },
        ],
        attributes: ['id', 'view_count'],
        raw: true,
        order: most_viewed_History ? [['view_count', 'DESC']] : [],
        limit: most_viewed_History ? 4 : null,
      });

      for(const item of productHistoryList) {
        const product_price = item.product.product_price;
        let discountDetails = this.#calculateDiscountPrice(
          product_price.discount_start_date,
          product_price.discount_end_date,
          product_price.discount,
          product_price.actual_price,
          product_price.discount_type
        );

        item.product.product_price.discount_status = discountDetails.discountStatus;
        item.product.product_price.discount_price = discountDetails.discountPrice;

        return { statusCode: STATUS_CODE.SUCCESS, message: MESSAGES.SUCCESS, data: { productHistoryList } };
      }
    }
    catch(err) {
      throw err;
    }
  }

  async delete(id: number) {
    try {
      let existingProductHistory = await this.productHistoryRepository.findOne({ where: { id } });

      if (existingProductHistory) {
        await this.productHistoryRepository.update({ is_deleted: 1 }, { where: { id } });

        return { statusCode: STATUS_CODE.SUCCESS, message: MESSAGES.SUCCESS };
      } else {
        return { statusCode: STATUS_CODE.NOT_FOUND, message: MESSAGES.INVALID_PRODUCT_HISTORY_ID };
      }
    }
    catch(err) {
      throw err;
    }
  }
}
