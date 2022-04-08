import { Module } from '@nestjs/common';

import { UserProductReviewController } from './product-review.controller';
import { UserProductReviewProvider } from './product-review.provider';
import { ProductReviewService } from './product-review.service';

@Module({
  controllers: [UserProductReviewController],
  providers: [ProductReviewService, ...UserProductReviewProvider],
})
export class UserProductReviewModule {}
