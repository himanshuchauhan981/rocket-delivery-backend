import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { ProductReviewService } from './product-review.service';
import {
  NewProductReview,
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
    @Param() params: SpecificProductReview,
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
  async delete(@Body(new ValidationPipe()) payload: SpecificProductReview) {
    return await this.productReviewService.delete(payload.id);
  }
}
