import { Module } from '@nestjs/common';
import { WishlistService } from 'src/modules/wishlist/wishlist.service';
import { UserWishlistController } from './wishlist.controller';
import { UserWishlistProvider } from './wishlist.provider';

@Module({
  controllers: [UserWishlistController],
  providers: [WishlistService, ...UserWishlistProvider],
})
export class UserWishlistModule {}
