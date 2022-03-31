import {
  CATEGORY_REPOSITORY,
  MEASURING_UNIT_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_HISTORY_REPOSITORY,
  PRODUCT_PRICE_REPOSITORY,
  PRODUCT_REPOSITORY,
  PRODUCT_REVIEW_REPOSITORY,
  SUB_CATEGORY_REPOSITORY,
} from 'src/core/constants/repositories';
import { Category } from 'src/modules/category/category.entity';
import { MeasuringUnit } from 'src/modules/measuring-unit/measuring-unit.entity';
import { Order } from 'src/modules/order/order.entity';
import { ProductHistory } from 'src/modules/product-history/product-history.entity';
import { ProductReview } from 'src/modules/product-review/product-review.entity';
import { ProductPrice } from 'src/modules/product/product-price.entity';
import { Product } from 'src/modules/product/product.entity';
import { SubCategory } from 'src/modules/sub-category/sub-category.entity';

export const AdminCategoryProvider = [
  { provide: CATEGORY_REPOSITORY, useValue: Category },
  { provide: SUB_CATEGORY_REPOSITORY, useValue: SubCategory },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: PRODUCT_PRICE_REPOSITORY, useValue: ProductPrice },
  { provide: MEASURING_UNIT_REPOSITORY, useValue: MeasuringUnit },
  { provide: ORDER_REPOSITORY, useValue: Order },
  { provide: PRODUCT_REVIEW_REPOSITORY, useValue: ProductReview },
  { provide: PRODUCT_HISTORY_REPOSITORY, useValue: ProductHistory },
];
