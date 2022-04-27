import { Module } from '@nestjs/common';

import { ProductService } from 'src/modules/product/product.service';
import { UserWishlistController } from './wishlist.controller';
import { UserWishlistProvider } from './wishlist.provider';
import { WishlistService } from './wishlist.service';

@Module({
  controllers: [UserWishlistController],
  providers: [WishlistService, ProductService, ...UserWishlistProvider],
})
export class UserWishlistModule {}
