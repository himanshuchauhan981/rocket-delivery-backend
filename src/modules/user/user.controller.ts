import { Body, Controller, Get, Post, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { ProductService } from '../product/product.service';
import { SubCategoryService } from '../sub-category/sub-category.service';
import { UserLogin, UserSignup, UserCategoryList, UserSubCategoryList, UserCart } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
	constructor(
    private readonly userService: UserService,
    private readonly subCategoryService: SubCategoryService,
    private readonly productService: ProductService
  ) {}

  @Post('signup')
  @UseInterceptors(TransformInterceptor)
  async signup(@Body(ValidationPipe) payload: UserSignup) {
		return await this.userService.signup(payload);
  }

	@Post('login')
  @UseInterceptors(TransformInterceptor)
  async login(@Body(ValidationPipe) payload: UserLogin) {
		return await this.userService.login(payload);
  }

  @Get('categories')
  @UseInterceptors(TransformInterceptor)
  async listCategories(@Query(new ValidationPipe()) query: UserCategoryList) {
    return await this.userService.listCategories(query.limit);
  }

  @Get('subCategory')
  @UseInterceptors(TransformInterceptor)
  async listSubCategory(@Query(new ValidationPipe()) query: UserSubCategoryList) {
    return await this.subCategoryService.list(query.category_id);
  }

  @Post('cart')
  @UseInterceptors(TransformInterceptor)
  async cartDetails(@Body(new ValidationPipe()) payload: UserCart) {
    return await this.productService.cartItems(payload);
  }
}
