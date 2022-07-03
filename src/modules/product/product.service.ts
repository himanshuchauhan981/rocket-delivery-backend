import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import * as moment from 'moment';

import { PRODUCT_REPOSITORY } from '../../core/constants/repositories';
import { File } from '../admin/file/file.entity';
import { ProductPrice } from './product-price.entity';
import { Product } from './product.entity';
import { MESSAGES } from '../../core/constants/messages';
import { STATUS_CODE } from '../../core/constants/status_code';
import { UserCart } from '../user/dto/user.dto';
import { Category } from '../category/category.entity';
import { MeasuringUnit } from '../measuring-unit/measuring-unit.entity';
import { ProductReview } from '../product-review/product-review.entity';
import { SubCategory } from '../sub-category/sub-category.entity';
import { DISCOUNT_TYPE } from 'src/core/constants/constants';
import { ProductDescription } from './product-description.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  calculateDiscountPrice(
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
      if (discount_type == DISCOUNT_TYPE.FLAT) {
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

  async countProducts(category_id: number): Promise<number> {
    try {
      const products = await this.productRepository.findAndCountAll({
        where: { category_id },
      });

      return products.count;
    } catch (err) {
      return err;
    }
  }

  async deleteByCategoryId(category_id: number[]): Promise<void> {
    await this.productRepository.update(
      { is_deleted: 1, is_active: 0 },
      { where: { category_id } },
    );
  }

  async cartItems(payload: UserCart) {
    const productIds = payload.cartItems.map((items) => items.id);

    const productDetails = await this.productRepository.findAll({
      where: { id: { [sequelize.Op.in]: productIds } },
      include: [
        {
          model: ProductPrice,
          attributes: [
            'actual_price',
            'discount',
            'discount_type',
            'discount_start_date',
            'discount_end_date',
          ],
        },
        { model: File, attributes: ['id', 'url'] },
      ],
      attributes: [
        'id',
        'name',
        'is_active',
        'max_quantity',
        'minimum_cart_quantity',
        'maximum_cart_quantity',
      ],
    });

    for (const item of productDetails) {
      const product_price = item.product_price;

      const discountDetails = this.calculateDiscountPrice(
        product_price.discount_start_date,
        product_price.discount_end_date,
        product_price.discount,
        product_price.actual_price,
        product_price.discount_type,
      );

      if (discountDetails.discountStatus) {
        item.product_price.discount_price = discountDetails.discountPrice;
        item.product_price.discount_status = discountDetails.discountStatus;
      }

      const productQuantity = payload.cartItems.filter(
        (cartItem) => cartItem.id === item.id,
      )[0].quantity;

      if (
        productQuantity < item.max_quantity &&
        payload.removeCartItem === true
      ) {
        item.quantity = productQuantity;
      } else if (payload.removeCartItem === false) {
        item.quantity = productQuantity;
      }
    }

    return {
      statusCode: STATUS_CODE.SUCCESS,
      data: { cartProductDetails: productDetails },
      message: MESSAGES.SUCCESS,
    };
  }

  async findOneById(productId: number) {
    try {
      const productDetails = await this.productRepository.findByPk(productId, {
        include: [
          {
            model: ProductPrice,
            attributes: [
              'actual_price',
              'discount_start_date',
              'discount_end_date',
              'discount_type',
              'discount',
              'refundable',
            ],
          },
          { model: File, attributes: ['id', 'url', 'name'] },
          { model: Category, attributes: ['id', 'name'] },
          { model: SubCategory, attributes: ['id', 'name'] },
          {
            model: MeasuringUnit,
            attributes: ['id', 'measuring_type', 'symbol'],
          },
          {
            model: ProductReview,
            attributes: ['id', 'ratings', 'headline', 'opinion'],
            where: { is_deleted: 0 },
            required: false,
          },
          {
            model: ProductDescription,
            attributes: [
              'id',
              'benefits',
              'ingredients',
              'features',
              'description',
            ],
          },
        ],
        attributes: [
          'id',
          'name',
          'max_quantity',
          'minimum_cart_quantity',
          'maximum_cart_quantity',
          'payment_method',
          'stock_visibility',
        ],
      });

      if (!productDetails) {
        throw new HttpException(
          MESSAGES.INVALID_PRODUCT_ID,
          STATUS_CODE.NOT_FOUND,
        );
      }

      const productPrice = productDetails.product_price;
      let ratingCount = 0;

      const discountDetails = this.calculateDiscountPrice(
        productPrice.discount_start_date,
        productPrice.discount_end_date,
        productPrice.discount,
        productPrice.actual_price,
        productPrice.discount_type,
      );

      productDetails.product_price.discount_status =
        discountDetails.discountStatus;
      productDetails.product_price.discount = discountDetails.discountPrice;

      for (let i = 0; i < productDetails.product_review.length; i++) {
        ratingCount = ratingCount + productDetails.product_review[i].ratings;
      }

      const avergeRating = ratingCount / productDetails.product_review.length;
      productDetails.average_ratings = parseFloat(avergeRating.toFixed(2));

      return {
        statusCode: STATUS_CODE.SUCCESS,
        data: { product_details: productDetails },
        message: MESSAGES.SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }
}
