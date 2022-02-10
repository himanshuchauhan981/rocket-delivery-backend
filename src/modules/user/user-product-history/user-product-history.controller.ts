import { Body, Controller, Delete, Get, Param, Post, Req, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { ProductHistoryService } from 'src/modules/product-history/product-history.service';
import { NewProductHistory, SpecificProductHistory } from './dto/product-history.dto';

@Controller('user/product-history')
@ApiTags('User product history')
export class UserProductHistoryController {

  constructor(private readonly productHistoryService: ProductHistoryService) {}

  @Post('new')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async create(@Body(new ValidationPipe()) payload: NewProductHistory, @Req() request) {
    return await this.productHistoryService.create(payload, request.userId);
  }

  @Get('list')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async list(@Req() request) {
    return await this.productHistoryService.list(request.userId, false);
  }

  @Delete(':id')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async delete(@Param(new ValidationPipe()) params: SpecificProductHistory) {
    return await this.productHistoryService.delete(params.id);
  }
}
