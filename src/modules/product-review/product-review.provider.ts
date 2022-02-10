import { ORDER_REPOSITORY, PRODUCT_REVIEW_FILE_REPOSITORY, PRODUCT_REVIEW_REPOSITORY } from "src/core/constants/repositories";
import { Order } from "../order/order.entity";
import { ProductReviewFile } from "./product-review-file.entity";
import { ProductReview } from "./product-review.entity";

export const ProductReviewProvider = [
  { provide: ORDER_REPOSITORY, useValue: Order },
  { provide: PRODUCT_REVIEW_REPOSITORY, useValue: ProductReview },
  { provide: PRODUCT_REVIEW_FILE_REPOSITORY, useValue: ProductReviewFile },
];