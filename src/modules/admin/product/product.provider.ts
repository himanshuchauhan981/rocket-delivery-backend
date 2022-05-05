import {
  CATEGORY_REPOSITORY,
  MEASURING_UNIT_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_PRICE_REPOSITORY,
  PRODUCT_REPOSITORY,
  SUB_CATEGORY_REPOSITORY,
} from '../../../core/constants/repositories';
import { Category } from '../../../modules/category/category.entity';
import { MeasuringUnit } from '../../../modules/measuring-unit/measuring-unit.entity';
import { Order } from '../../../modules/order/order.entity';
import { ProductPrice } from '../../../modules/product/product-price.entity';
import { Product } from '../../../modules/product/product.entity';
import { SubCategory } from '../../../modules/sub-category/sub-category.entity';

export const AdminProductProvider = [
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: PRODUCT_PRICE_REPOSITORY, useValue: ProductPrice },
  { provide: CATEGORY_REPOSITORY, useValue: Category },
  { provide: SUB_CATEGORY_REPOSITORY, useValue: SubCategory },
  { provide: MEASURING_UNIT_REPOSITORY, useValue: MeasuringUnit },
  { provide: ORDER_REPOSITORY, useValue: Order },
];
