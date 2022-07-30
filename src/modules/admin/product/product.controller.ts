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
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { ProductService } from './product.service';
import { ProductService as CommonProductService } from '../../product/product.service';
import {
  AdminProductList,
  NewProduct,
  SpecificProduct,
} from './dto/admin-product.dto';
import { AdminProductListResponse } from './dto/admin-product-response.dto';
import { APIResponse } from 'src/modules/common/dto/common.dto';
import { ProductDetailResponse } from 'src/modules/product/interface/response.interface';

@Controller('admin/product')
@ApiTags('Admin products')
export class AdminProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly commonProductService: CommonProductService,
  ) {}

  @Get('list')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: AdminProductListResponse })
  findAll(
    @Query(new ValidationPipe()) payload: AdminProductList,
  ): Promise<AdminProductListResponse> {
    return this.productService.findAll(payload);
  }

  @Get(':id')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: ProductDetailResponse })
  findOneById(
    @Param(new ValidationPipe()) params: SpecificProduct,
  ): Promise<ProductDetailResponse> {
    return this.commonProductService.findOneById(params.id);
  }

  @Put(':id')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: APIResponse })
  @ApiNotFoundResponse({
    type: APIResponse,
    description: 'Product ID not found',
  })
  update(
    @Param(new ValidationPipe()) params: SpecificProduct,
    @Body(new ValidationPipe()) payload: NewProduct,
  ): Promise<APIResponse> {
    return this.productService.update(payload, params.id);
  }

  @Delete(':id')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: APIResponse })
  @ApiNotFoundResponse({
    type: APIResponse,
    description: 'Product ID not found',
  })
  delete(
    @Param(new ValidationPipe()) params: SpecificProduct,
  ): Promise<APIResponse> {
    return this.productService.delete(params.id);
  }

  @Post('new')
  @Auth('ADMIN')
  @ApiOkResponse({ type: APIResponse })
  @UseInterceptors(TransformInterceptor)
  createNew(
    @Body(new ValidationPipe()) payload: NewProduct,
  ): Promise<APIResponse> {
    return this.productService.createNew(payload);
  }
}
