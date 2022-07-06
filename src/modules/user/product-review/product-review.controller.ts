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
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async create(
    @Body(new ValidationPipe()) payload: NewProductReview,
    @Req() request,
  ) {
    return await this.productReviewService.create(payload, request.userId);
  }

  @Patch('update/:id')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async update(
    @Body(new ValidationPipe()) payload: UpdateProductReview,
    @Req() request,
    @Param(new ValidationPipe()) params: SpecificProductReview,
  ) {
    return await this.productReviewService.update(
      payload,
      request.userId,
      params.id,
    );
  }

  @Delete(':id')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async delete(@Param(new ValidationPipe()) payload: SpecificProductReview) {
    return await this.productReviewService.delete(payload.id);
  }

  @Get('all')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async list(@Query(new ValidationPipe()) query: ProductReviewList) {
    return await this.productReviewService.list(query);
  }
}
