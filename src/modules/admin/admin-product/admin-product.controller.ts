import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JWTAuthGuard } from 'src/core/guard/jwt.guard';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { ProductService } from 'src/modules/product/product.service';
import { AdminProductList, NewProduct, SpecificProduct } from './dto/admin-product.dto';

@Controller('admin/product')
@ApiTags('Admin products')
export class AdminProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  @ApiBearerAuth('Authorization')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(TransformInterceptor)
  async findAll(@Query(new ValidationPipe()) payload: AdminProductList) {
    return await this.productService.findAll(payload);
  }

  @Get(':id')
  @ApiBearerAuth('Authorization')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(TransformInterceptor)
  async findOneById(@Param(new ValidationPipe()) params: SpecificProduct) {
    return await this.productService.findOneById(params.id)
  }

  @Put(':id')
  @ApiBearerAuth('Authorization')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(TransformInterceptor)
  async update(@Param(new ValidationPipe()) params: SpecificProduct, @Body(new ValidationPipe()) payload: NewProduct) {
    return await this.productService.update(payload, params.id);
  }

  @Delete(':id')
  @ApiBearerAuth('Authorization')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(TransformInterceptor)
  async delete(@Param(new ValidationPipe()) params: SpecificProduct) {
    return await this.productService.delete(params.id);
  }

  @Post('new')
  @ApiBearerAuth('Authorization')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(TransformInterceptor)
  async createNew(@Body(new ValidationPipe()) payload: NewProduct) {
    return await this.productService.createNew(payload);
  }
  
}
