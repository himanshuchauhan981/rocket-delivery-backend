import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { ProductService } from './product.service';
import { ProductService as CommonProductService } from '../../product/product.service';
import { UserProducts, SpecificProduct } from '../dto/user.dto';

@Controller('user/product')
@ApiTags('User products')
export class UserProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly commonProductService: CommonProductService,
  ) {}

  @Get('list')
  @UseInterceptors(TransformInterceptor)
  async productList(@Query(new ValidationPipe()) query: UserProducts) {
    return await this.productService.list(query);
  }

  @Get('offers')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async productOffers(@Req() request) {
    return await this.productService.productOffers(request.userId);
  }

  @Get('discountOffers')
  @UseInterceptors(TransformInterceptor)
  async discountOffers() {
    return await this.productService.discountOffers();
  }

  @Get(':id')
  @UseInterceptors(TransformInterceptor)
  async findOneById(@Param(new ValidationPipe()) params: SpecificProduct) {
    return await this.commonProductService.findOneById(params.id);
  }
}
