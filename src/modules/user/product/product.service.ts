import { HttpException, Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import sequelize from 'sequelize';

import { MESSAGES } from '../../../core/constants/messages';
import {
  CATEGORY_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_HISTORY_REPOSITORY,
  PRODUCT_REPOSITORY,
  SUB_CATEGORY_REPOSITORY,
} from '../../../core/constants/repositories';
import { STATUS_CODE } from '../../../core/constants/status_code';
import { File } from '../../../modules/admin/file/file.entity';
import { Category } from '../../../modules/category/category.entity';
import { MeasuringUnit } from '../../../modules/measuring-unit/measuring-unit.entity';
import { OrderProduct } from '../../../modules/order/order-product.entity';
import { Order } from '../../../modules/order/order.entity';
import { ProductHistory } from '../../../modules/product-history/product-history.entity';
import { ProductReview } from '../../../modules/product-review/product-review.entity';
import { ProductPrice } from '../../../modules/product/product-price.entity';
import { Product } from '../../../modules/product/product.entity';
import { SubCategory } from '../../../modules/sub-category/sub-category.entity';
import { ProductService as CommonProductService } from '../../product/product.service';
import { UserProducts } from '../dto/user.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
    @Inject(SUB_CATEGORY_REPOSITORY)
    private readonly subCategoryRepository: typeof SubCategory,
    @Inject(PRODUCT_HISTORY_REPOSITORY)
    private readonly productHistoryRepository: typeof ProductHistory,
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: typeof Order,
    private readonly commonProductService: CommonProductService,
  ) {}

  async #mostBookedProducts() {
    try {
      const bookedProducts = await this.orderRepository.findAll({
        include: [{ model: OrderProduct, attributes: [] }],
        attributes: [
          'order_products.product_id',
          [
            sequelize.fn('COUNT', sequelize.col('order_products.product_id')),
            'count',
          ],
        ],
        group: ['order_products.product_id'],
        order: [['count', 'DESC']],
        raw: true,
        subQuery: false,
        limit: 4,
      });

      for (const item of bookedProducts) {
        const productDetails = await this.productRepository.findOne({
          where: { id: item.product_id },
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
            { model: File, attributes: ['url'] },
            { model: ProductReview, attributes: ['id', 'ratings'] },
          ],
          attributes: ['name', 'id'],
        });

        const product_price = productDetails.product_price;

        const discountDetails =
          this.commonProductService.calculateDiscountPrice(
            product_price.discount_start_date,
            product_price.discount_end_date,
            product_price.discount,
            product_price.actual_price,
            product_price.discount_type,
          );

        productDetails.product_price.discount = discountDetails.discountPrice;
        productDetails.product_price.discount_status =
          discountDetails.discountStatus;

        let ratingCount = 0;
        for (let i = 0; i < productDetails.product_review.length; i++) {
          ratingCount = ratingCount + productDetails.product_review[i].ratings;
        }

        const averageRatings =
          productDetails.product_review.length === 0
            ? 0
            : ratingCount / productDetails.product_review.length;
        item.product = productDetails;
        item.product.average_ratings = averageRatings;
      }

      return bookedProducts;
    } catch (err) {
      throw err;
    }
  }

  async #mostViewedProducts(user_id: number, most_viewed_history: boolean) {
    try {
      const viewedProductDetails = await this.productHistoryRepository.findAll({
        where: { [sequelize.Op.and]: [{ user_id }, { is_deleted: 0 }] },
        include: [
          {
            model: Product,
            attributes: ['id', 'name'],
            include: [
              {
                model: ProductPrice,
                attributes: [
                  'actual_price',
                  'discount_type',
                  'discount',
                  'discount_start_date',
                  'discount_end_date',
                ],
              },
              { model: File, attributes: ['id', 'url'] },
            ],
          },
        ],
        attributes: ['id', 'view_count'],
        order: most_viewed_history ? [['view_count', 'DESC']] : [],
        limit: most_viewed_history ? 4 : null,
      });

      for (const item of viewedProductDetails) {
        const product_price = item.product.product_price;
        const discountDetails =
          this.commonProductService.calculateDiscountPrice(
            product_price.discount_start_date,
            product_price.discount_end_date,
            product_price.discount,
            product_price.actual_price,
            product_price.discount_type,
          );
        item.product.product_price.discount_price =
          discountDetails.discountPrice;
        item.product.product_price.discount_status =
          discountDetails.discountStatus;
      }

      return viewedProductDetails;
    } catch (err) {
      throw err;
    }
  }

  async list(payload: UserProducts) {
    try {
      payload.page = payload.page * payload.limit;
      if (payload.sub_category_id) {
        const subCategoryDetails = await this.subCategoryRepository.findByPk(
          payload.sub_category_id,
        );

        if (!subCategoryDetails) {
          throw new HttpException(
            MESSAGES.SUB_CATEGORY_NOT_FOUND,
            STATUS_CODE.NOT_FOUND,
          );
        }
      } else if (payload.category_id) {
        const categoryDetails = await this.categoryRepository.findByPk(
          payload.category_id,
        );

        if (!categoryDetails) {
          throw new HttpException(
            MESSAGES.CATEGORY_NOT_FOUND,
            STATUS_CODE.NOT_FOUND,
          );
        }
      }

      const products = await this.productRepository.findAndCountAll({
        where: payload.sub_category_id
          ? { is_active: 1, is_deleted: 0 }
          : { category_id: payload.category_id, is_active: 1, is_deleted: 0 },
        include: [
          {
            model: ProductPrice,
            attributes: [
              'actual_price',
              'discount',
              'discount_start_date',
              'discount_end_date',
              'discount_type',
            ],
          },
          { model: MeasuringUnit, attributes: ['symbol'] },
          { model: File, attributes: ['id', 'url'] },
          payload.sub_category_id
            ? {
                model: SubCategory,
                where: { id: payload.sub_category_id },
                attributes: [],
              }
            : { model: Category, attributes: [] },
        ],
        order: [['name', 'ASC']],
        offset: payload.page,
        limit: payload.limit,
        attributes: [
          'id',
          'name',
          'max_quantity',
          'minimum_cart_quantity',
          'maximum_cart_quantity',
          payload.sub_category_id
            ? [sequelize.col('subCategory.name'), 'subCategoryName']
            : [sequelize.col('category.name'), 'subCategoryName'],
        ],
      });

      for (const item of products.rows) {
        const productPrice = item.product_price;

        const discountDetails =
          this.commonProductService.calculateDiscountPrice(
            productPrice.discount_start_date,
            productPrice.discount_end_date,
            productPrice.discount,
            productPrice.actual_price,
            productPrice.discount_type,
          );

        item.product_price.discount_status = discountDetails.discountStatus;
        item.product_price.discount_price = discountDetails.discountPrice;
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { products: products.rows, count: products.count },
      };
    } catch (err) {
      throw err;
    }
  }

  async productOffers(userId: number) {
    try {
      const orderDetails = await this.#mostBookedProducts();
      const viewedProducts = await this.#mostViewedProducts(userId, false);

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: STATUS_CODE.SUCCESS,
        data: { orderDetails, viewedProducts },
      };
    } catch (err) {
      throw err;
    }
  }

  async discountOffers() {
    try {
      const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
      const productDetails = await this.productRepository.findAll({
        where: {},
        include: [
          { model: File, attributes: ['id', 'url'] },
          {
            model: ProductPrice,
            where: {
              [sequelize.Op.and]: [
                { discount_start_date: { [sequelize.Op.lt]: currentDate } },
                { discount_end_date: { [sequelize.Op.gt]: currentDate } },
              ],
            },
            attributes: [
              'actual_price',
              'discount',
              'discount_start_date',
              'discount_end_date',
              'discount_type',
            ],
          },
        ],
        attributes: ['id', 'name'],
        order: [['name', 'ASC']],
        limit: 5,
      });

      for (const item of productDetails) {
        const discountDetails =
          this.commonProductService.calculateDiscountPrice(
            item.product_price.discount_start_date,
            item.product_price.discount_end_date,
            item.product_price.discount,
            item.product_price.actual_price,
            item.product_price.discount_type,
          );

        item.product_price.discount_price = discountDetails.discountPrice;
        item.product_price.discount_status = discountDetails.discountStatus;
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { productDetails },
      };
    } catch (err) {
      throw err;
    }
  }
}
