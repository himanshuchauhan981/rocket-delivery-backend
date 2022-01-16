import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductService } from 'src/modules/product/product.service';
import { AdminProductList } from './dto/admin-product.dto';

@Controller('admin/product')
@ApiTags('Admin products')
export class AdminProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  async getAll(@Query(new ValidationPipe()) payload: AdminProductList) {
    return await this.productService.getAll(payload);
  }
}
