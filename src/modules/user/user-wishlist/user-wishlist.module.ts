import { Module } from '@nestjs/common';
import { WishlistService } from 'src/modules/wishlist/wishlist.service';
import { UserWishlistController } from './user-wishlist.controller';
import { UserWishlistProvider } from './user-wishlist.provider';

@Module({
  controllers: [UserWishlistController],
  providers: [WishlistService, ...UserWishlistProvider],
})
export class UserWishlistModule {}
