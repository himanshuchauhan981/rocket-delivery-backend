import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import * as moment from 'moment';

import { MESSAGES } from 'src/core/constants/messages';
import { PRODUCT_HISTORY_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { File } from '../admin/file/file.entity';
import { ProductPrice } from '../product/product-price.entity';
import { Product } from '../product/product.entity';
import { NewProductHistory } from '../user/product-history/dto/product-history.dto';
import { ProductHistory } from './product-history.entity';

@Injectable()
export class ProductHistoryService {
  constructor(
    @Inject(PRODUCT_HISTORY_REPOSITORY)
    private readonly productHistoryRepository: typeof ProductHistory,
  ) {}

  #calculateDiscountPrice(
    start_date: Date,
    end_date: Date,
    discount: number,
    actual_price: number,
    discount_type: string,
  ) {
    const currentDate = moment();
    const discountStartDate = moment(start_date);
    const discountEndDate = moment(end_date);
    let discountStatus;
    let discountPrice;

    if (
      discountStartDate.isBefore(currentDate) &&
      discountEndDate.isAfter(discountStartDate)
    ) {
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
}
