import { Module } from '@nestjs/common';

import { ProductReviewProvider } from './product-review.provider';
import { ProductReviewService } from './product-review.service';

@Module({
  providers: [ProductReviewService, ...ProductReviewProvider]
})
export class ProductReviewModule {}
