import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { ProductHistoryService } from './product-history.service';
import {
  NewProductHistory,
  SpecificProductHistory,
} from './dto/product-history.dto';

@Controller('user/product-history')
@ApiTags('User product history')
export class UserProductHistoryController {
  constructor(private readonly productHistoryService: ProductHistoryService) {}

  @Post('new')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  create(
    @Body(new ValidationPipe()) payload: NewProductHistory,
    @Req() request,
  ) {
    return this.productHistoryService.create(payload, request.userId);
  }

  @Get('list')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  list(@Req() request) {
    return this.productHistoryService.list(request.userId, false);
  }

  @Delete(':id')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  delete(@Param(new ValidationPipe()) params: SpecificProductHistory) {
    return this.productHistoryService.delete(params.id);
  }
}
