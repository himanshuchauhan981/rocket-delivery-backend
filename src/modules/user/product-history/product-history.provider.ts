import {
  ORDER_REPOSITORY,
  PRODUCT_HISTORY_REPOSITORY,
  PRODUCT_REPOSITORY,
} from '../../../core/constants/repositories';
import { Order } from '../../../modules/order/order.entity';
import { ProductHistory } from '../../../modules/product-history/product-history.entity';
import { Product } from '../../../modules/product/product.entity';

export const UserProductHistoryProvider = [
  { provide: PRODUCT_HISTORY_REPOSITORY, useValue: ProductHistory },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: ORDER_REPOSITORY, useValue: Order },
];
