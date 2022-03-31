import { Module } from '@nestjs/common';

import { ProductReviewService } from 'src/modules/product-review/product-review.service';
import { UserProductReviewController } from './product-review.controller';
import { UserProductReviewProvider } from './product-review.provider';

@Module({
  controllers: [UserProductReviewController],
  providers: [ProductReviewService, ...UserProductReviewProvider],
})
export class UserProductReviewModule {}
