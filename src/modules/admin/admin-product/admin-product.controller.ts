import { Body, Controller, Get, Post, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';

import { ProductService } from 'src/modules/product/product.service';
import { AdminProductList, NewProduct } from './dto/admin-product.dto';

@Controller('admin/product')
@ApiTags('Admin products')
export class AdminProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  @UseInterceptors(TransformInterceptor)
  async getAll(@Query(new ValidationPipe()) payload: AdminProductList) {
    return await this.productService.getAll(payload);
  }

  @Post('new')
  @UseInterceptors(TransformInterceptor)
  async createNew(@Body(new ValidationPipe()) payload: NewProduct) {
    return await this.productService.createNew(payload);
  }
  
}
