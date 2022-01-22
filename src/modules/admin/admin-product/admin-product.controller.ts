import { Body, Controller, Get, Param, Post, Put, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';

import { ProductService } from 'src/modules/product/product.service';
import { AdminProductList, NewProduct, SpecificProduct } from './dto/admin-product.dto';

@Controller('admin/product')
@ApiTags('Admin products')
export class AdminProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  @UseInterceptors(TransformInterceptor)
  async findAll(@Query(new ValidationPipe()) payload: AdminProductList) {
    return await this.productService.findAll(payload);
  }

  @Get(':id')
  @UseInterceptors(TransformInterceptor)
  async findOneById(@Param(new ValidationPipe()) params: SpecificProduct) {
    return await this.productService.findOneById(params.id)
  }

  @Put(':id')
  @UseInterceptors(TransformInterceptor)
  async update(@Param(new ValidationPipe()) params: SpecificProduct) {

  }

  @Post('new')
  @UseInterceptors(TransformInterceptor)
  async createNew(@Body(new ValidationPipe()) payload: NewProduct) {
    return await this.productService.createNew(payload);
  }
  
}
