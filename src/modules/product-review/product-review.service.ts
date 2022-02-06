import { HttpException, Inject, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/core/constants/messages';
import { ORDER_REPOSITORY, PRODUCT_REVIEW_FILE_REPOSITORY, PRODUCT_REVIEW_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { Order } from '../order/order.entity';
import { NewProductReview, UpdateProductReview } from '../user/user-product-review/dto/product-review.dto';
import { ProductReviewFile } from './product-review-file.entity';
import { ProductReview } from './product-review.entity';

@Injectable()
export class ProductReviewService {

  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
    @Inject(PRODUCT_REVIEW_REPOSITORY) private readonly productReviewRepository: typeof ProductReview,
    @Inject(PRODUCT_REVIEW_FILE_REPOSITORY) private readonly productReviewFileRepository: typeof ProductReviewFile
  ) {}
  
  async create(payload: NewProductReview, user_id: number) {
    try {
      const orderDetails = await this.orderRepository.findByPk(payload.order_id);

      if(orderDetails) {
        const newProductReview = await this.productReviewRepository.create<any>({
          headline: payload.headline,
          opinion: payload.opinion,
          user_id,
          product_id: payload.product_id,
          ratings: payload.ratings,
          order_id: payload.order_id
        });

        const reviewImages = payload.review_images.map(item =>({ ...item, review_id: newProductReview.id, order_product_id: payload.order_product_id }))

        await this.productReviewFileRepository.bulkCreate<any>(reviewImages);
        return { statusCode: STATUS_CODE.SUCCESS, message: MESSAGES.SUCCESS };
      }
      else {
        throw new HttpException(MESSAGES.INVALID_ORDER_ID, STATUS_CODE.NOT_FOUND);
      }
    }
    catch(err) {
      throw err;
    }
  }

  async update(payload: UpdateProductReview, id: number) {
    try {
      await this.productReviewRepository.update(
        { headline: payload.headline, opinion: payload.opinion, ratings: payload.ratings },
        { where: { id } }
      );

      let productImages = [];

      for (let i = 0; i < payload.remove_image_id.length; i++) {
        await this.productReviewFileRepository.update(
          { is_deleted: 1 },
          { where: { id: payload.remove_image_id[i] } }
        );
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

      return { statusCode: STATUS_CODE.SUCCESS, message: MESSAGES.SUCCESS };
    }
    catch(err) {
      throw err;
    }
  }

  async delete(id: number) {
    try {
      await this.productReviewRepository.update(
        { is_deleted: 1 },
        { where: { id } }
      );

      return { statusCode: STATUS_CODE.SUCCESS, message: MESSAGES.SUCCESS };
    }
    catch(err) {
      throw err;
    }
  }
}
