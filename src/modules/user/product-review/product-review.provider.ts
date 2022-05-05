import {
  ORDER_REPOSITORY,
  PRODUCT_REVIEW_FILE_REPOSITORY,
  PRODUCT_REVIEW_REPOSITORY,
} from '../../../core/constants/repositories';
import { Order } from '../../../modules/order/order.entity';
import { ProductReviewFile } from '../../../modules/product-review/product-review-file.entity';
import { ProductReview } from '../../../modules/product-review/product-review.entity';

export const UserProductReviewProvider = [
  { provide: ORDER_REPOSITORY, useValue: Order },
  { provide: PRODUCT_REVIEW_REPOSITORY, useValue: ProductReview },
  { provide: PRODUCT_REVIEW_FILE_REPOSITORY, useValue: ProductReviewFile },
];
