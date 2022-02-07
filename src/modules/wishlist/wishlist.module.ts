import { Module } from '@nestjs/common';

import { WishlistProvider } from './wishlist.provider';
import { WishlistService } from './wishlist.service';

@Module({
  providers: [WishlistService, ...WishlistProvider]
})
export class WishlistModule {}
