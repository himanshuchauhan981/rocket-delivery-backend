import { Module } from '@nestjs/common';

import { UserWishlistController } from './wishlist.controller';
import { UserWishlistProvider } from './wishlist.provider';
import { WishlistService } from './wishlist.service';

@Module({
  controllers: [UserWishlistController],
  providers: [WishlistService, ...UserWishlistProvider],
})
export class UserWishlistModule {}
