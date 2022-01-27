import { Module } from '@nestjs/common';

import { ProductReviewService } from 'src/modules/product-review/product-review.service';
import { UserProductReviewController } from './user-product-review.controller';
import { UserProductReviewProvider } from './user-product-review.provider';

@Module({
  controllers: [UserProductReviewController],
  providers: [ProductReviewService, ...UserProductReviewProvider]
})
export class UserProductReviewModule {}
