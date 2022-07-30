import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { ProductReviewService } from './product-review.service';
import {
  NewProductReview,
  ProductReviewList,
  SpecificProductReview,
  UpdateProductReview,
} from './dto/product-review.dto';

@Controller('user/product-review')
@ApiTags('Product review')
export class UserProductReviewController {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @Post('new')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  create(
    @Body(new ValidationPipe()) payload: NewProductReview,
    @Req() request,
  ) {
    return this.productReviewService.create(payload, request.userId);
  }

  @Patch('update/:id')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  update(
    @Body(new ValidationPipe()) payload: UpdateProductReview,
    @Req() request,
    @Param(new ValidationPipe()) params: SpecificProductReview,
  ) {
    return this.productReviewService.update(payload, request.userId, params.id);
  }

  @Delete(':id')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  delete(@Param(new ValidationPipe()) payload: SpecificProductReview) {
    return this.productReviewService.delete(payload.id);
  }

  @Get('list')
  @UseInterceptors(TransformInterceptor)
  list(@Query(new ValidationPipe()) query: ProductReviewList) {
    return this.productReviewService.list(query);
  }
}
