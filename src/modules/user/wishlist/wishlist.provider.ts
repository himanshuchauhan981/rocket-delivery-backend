import {
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
  WISHLIST_REPOSITORY,
} from '../../../core/constants/repositories';
import { Order } from '../../../modules/order/order.entity';
import { Product } from '../../../modules/product/product.entity';
import { Wishlist } from '../../../modules/wishlist/wishlist.entity';

export const UserWishlistProvider = [
  { provide: WISHLIST_REPOSITORY, useValue: Wishlist },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: ORDER_REPOSITORY, useValue: Order },
];
