import {
  CATEGORY_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_HISTORY_REPOSITORY,
  PRODUCT_REPOSITORY,
  PRODUCT_REVIEW_REPOSITORY,
  SUB_CATEGORY_REPOSITORY,
} from '../../../core/constants/repositories';
import { Category } from '../../../modules/category/category.entity';
import { Order } from '../../../modules/order/order.entity';
import { ProductHistory } from '../../../modules/product-history/product-history.entity';
import { ProductReview } from '../../../modules/product-review/product-review.entity';
import { Product } from '../../../modules/product/product.entity';
import { SubCategory } from '../../../modules/sub-category/sub-category.entity';

export const UserProductProvider = [
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: CATEGORY_REPOSITORY, useValue: Category },
  { provide: SUB_CATEGORY_REPOSITORY, useValue: SubCategory },
  { provide: ORDER_REPOSITORY, useValue: Order },
  { provide: PRODUCT_REVIEW_REPOSITORY, useValue: ProductReview },
  { provide: PRODUCT_HISTORY_REPOSITORY, useValue: ProductHistory },
];
