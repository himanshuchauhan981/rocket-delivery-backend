import {
  ADDRESS_REPOSITORY,
  ADMIN_REPOSITORY,
  CATEGORY_REPOSITORY,
  MEASURING_UNIT_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_PRICE_REPOSITORY,
  PRODUCT_REPOSITORY,
  PRODUCT_REVIEW_REPOSITORY,
  SUB_CATEGORY_REPOSITORY,
} from 'src/core/constants/repositories';
import { Address } from '../address/address.entity';
import { Category } from '../category/category.entity';
import { MeasuringUnit } from '../measuring-unit/measuring-unit.entity';
import { Order } from '../order/order.entity';
import { ProductReview } from '../product-review/product-review.entity';
import { ProductPrice } from '../product/product-price.entity';
import { Product } from '../product/product.entity';
import { SubCategory } from '../sub-category/sub-category.entity';
import { Admin } from './admin.entity';

export const AdminProvider = [
  { provide: ADMIN_REPOSITORY, useValue: Admin },
  { provide: CATEGORY_REPOSITORY, useValue: Category },
  { provide: SUB_CATEGORY_REPOSITORY, useValue: SubCategory },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: PRODUCT_PRICE_REPOSITORY, useValue: ProductPrice },
  { provide: MEASURING_UNIT_REPOSITORY, useValue: MeasuringUnit },
  { provide: ORDER_REPOSITORY, useValue: Order },
  { provide: PRODUCT_REVIEW_REPOSITORY, useValue: ProductReview },
  { provide: ADDRESS_REPOSITORY, useValue: Address },
];
