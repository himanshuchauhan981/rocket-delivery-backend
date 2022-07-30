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
import {
  UserProducts,
  SpecificProduct,
  SimilarProducts,
} from '../dto/user.dto';

@Controller('user/product')
@ApiTags('User products')
export class UserProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly commonProductService: CommonProductService,
  ) {}

  @Get('list')
  @UseInterceptors(TransformInterceptor)
  productList(@Query(new ValidationPipe()) query: UserProducts) {
    return this.productService.list(query);
  }

  @Get('offers')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  productOffers(@Req() request) {
    return this.productService.productOffers(request.userId);
  }

  @Get('discountOffers')
  @UseInterceptors(TransformInterceptor)
  discountOffers() {
    return this.productService.discountOffers();
  }

  @Get('similar')
  @UseInterceptors(TransformInterceptor)
  findSimilarProducts(@Query(new ValidationPipe()) query: SimilarProducts) {
    return this.productService.findSimilarProducts(query);
  }

  @Get(':id')
  @UseInterceptors(TransformInterceptor)
  findOneById(@Param(new ValidationPipe()) params: SpecificProduct) {
    return this.commonProductService.findOneById(params.id);
  }
}
