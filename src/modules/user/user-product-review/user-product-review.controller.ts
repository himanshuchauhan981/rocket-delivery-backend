import { Body, Controller, Post, Req, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { ProductReviewService } from 'src/modules/product-review/product-review.service';
import { NewProductReview } from './dto/product-review.dto';

@Controller('user/product-review')
@ApiTags('Product review')
export class UserProductReviewController {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @Post('new')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async create(@Body(new ValidationPipe()) payload: NewProductReview, @Req() request) {
    return await this.productReviewService.create(payload, request.userId);
  }
}
