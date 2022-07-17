import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { ProductService } from './product.service';
import { ProductService as CommonProductService } from '../../product/product.service';
import {
  AdminProductList,
  NewProduct,
  SpecificProduct,
} from './dto/admin-product.dto';
import { ApiResponse } from '../dto/interface/admin';

@Controller('admin/product')
@ApiTags('Admin products')
export class AdminProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly commonProductService: CommonProductService,
  ) {}

  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async findAll(@Query(new ValidationPipe()) payload: AdminProductList) {
    return await this.productService.findAll(payload);
  }

  @Get(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async findOneById(@Param(new ValidationPipe()) params: SpecificProduct) {
    return await this.commonProductService.findOneById(params.id);
  }

  @Put(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async update(
    @Param(new ValidationPipe()) params: SpecificProduct,
    @Body(new ValidationPipe()) payload: NewProduct,
  ): Promise<ApiResponse> {
    return await this.productService.update(payload, params.id);
  }

  @Delete(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async delete(
    @Param(new ValidationPipe()) params: SpecificProduct,
  ): Promise<ApiResponse> {
    return await this.productService.delete(params.id);
  }

  @Post('new')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async createNew(
    @Body(new ValidationPipe()) payload: NewProduct,
  ): Promise<ApiResponse> {
    return await this.productService.createNew(payload);
  }
}
