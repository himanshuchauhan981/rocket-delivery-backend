import {
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
  WISHLIST_REPOSITORY,
} from 'src/core/constants/repositories';
import { Order } from 'src/modules/order/order.entity';
import { Product } from 'src/modules/product/product.entity';
import { Wishlist } from 'src/modules/wishlist/wishlist.entity';

export const UserWishlistProvider = [
  { provide: WISHLIST_REPOSITORY, useValue: Wishlist },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: ORDER_REPOSITORY, useValue: Order },
];
