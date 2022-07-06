import { Injectable, Inject, HttpException } from '@nestjs/common';
import sequelize from 'sequelize';

import { ApiResponse } from 'src/modules/admin/dto/interface/admin';
import { MESSAGES } from '../../../core/constants/messages';
import {
  ORDER_REPOSITORY,
  PRODUCT_REVIEW_FILE_REPOSITORY,
  PRODUCT_REVIEW_REPOSITORY,
} from '../../../core/constants/repositories';
import { STATUS_CODE } from '../../../core/constants/status_code';
import { Order } from '../../../modules/order/order.entity';
import { ProductReviewFile } from '../../../modules/product-review/product-review-file.entity';
import { ProductReview } from '../../../modules/product-review/product-review.entity';
import {
  NewProductReview,
  ProductReviewList,
  UpdateProductReview,
} from './dto/product-review.dto';

@Injectable()
export class ProductReviewService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
    @Inject(PRODUCT_REVIEW_REPOSITORY)
    private readonly productReviewRepository: typeof ProductReview,
    @Inject(PRODUCT_REVIEW_FILE_REPOSITORY)
    private readonly productReviewFileRepository: typeof ProductReviewFile,
  ) {}

  async create(
    payload: NewProductReview,
    user_id: number,
  ): Promise<ApiResponse> {
    try {
      const orderDetails = await this.orderRepository.findByPk(
        payload.order_id,
      );

      if (!orderDetails) {
        throw new HttpException(
          MESSAGES.INVALID_ORDER_ID,
          STATUS_CODE.NOT_FOUND,
        );
      }

      const newProductReview = await this.productReviewRepository.create<any>({
        headline: payload.headline,
        opinion: payload.opinion,
        user_id,
        product_id: payload.product_id,
        ratings: payload.ratings,
        order_id: payload.order_id,
      });

      const reviewImages = payload.review_images.map((item) => ({
        ...item,
        review_id: newProductReview.id,
        order_product_id: payload.order_product_id,
      }));

      await this.productReviewFileRepository.bulkCreate<any>(reviewImages);

      return { statusCode: STATUS_CODE.SUCCESS, message: MESSAGES.SUCCESS };
    } catch (err) {
      throw err;
    }
  }

  async update(
    payload: UpdateProductReview,
    user_id: number,
    id: number,
  ): Promise<ApiResponse> {
    try {
      const productImages = [];

      const [status] = await this.productReviewRepository.update(
        {
          headline: payload.headline,
          opinion: payload.opinion,
          ratings: payload.ratings,
        },
        { where: { [sequelize.Op.and]: [{ id }, { user_id }] } },
      );

      if (!status) {
        throw new HttpException(
          MESSAGES.REVIEW_NOT_FOUND,
          STATUS_CODE.NOT_FOUND,
        );
      }

      for (const id of payload.remove_image_id) {
        await this.productReviewFileRepository.destroy({
          where: { id },
        });
      }

      payload.review_images.forEach((item) => {
        productImages.push({
          image: item.url,
          review_id: id,
        });
      });

      if (productImages.length !== 0) {
        await this.productReviewFileRepository.bulkCreate(productImages);
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.PRODUCT_REVIEW_SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }

  async delete(id: number): Promise<ApiResponse> {
    try {
      const [status] = await this.productReviewRepository.update(
        { is_deleted: 1 },
        { where: { id } },
      );

      if (!status) {
        throw new HttpException(
          MESSAGES.REVIEW_NOT_FOUND,
          STATUS_CODE.NOT_FOUND,
        );
      }

      return { statusCode: STATUS_CODE.SUCCESS, message: MESSAGES.SUCCESS };
    } catch (err) {
      throw err;
    }
  }

  async list(query: ProductReviewList) {
    try {
      const pageIndex = query.pageIndex * query.pageSize;

      const productReviewList = await this.productReviewRepository.findAll({
        where: {
          [sequelize.Op.and]: [
            { product_id: query.productId },
            { is_deleted: 0 },
          ],
        },
        include: [
          { model: ProductReviewFile, attributes: ['id', 'url', 'created_at'] },
        ],
        attributes: ['id', 'headline', 'opinion', 'ratings', 'created_at'],
        offset: pageIndex,
        limit: query.pageSize,
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { productReviewList },
      };
    } catch (err) {
      throw err;
    }
  }
}
