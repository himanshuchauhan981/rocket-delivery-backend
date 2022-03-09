import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/core/decorators/auth.decorator';

import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { ApiResponse } from '../admin/dto/interface/admin';
import { ProductService } from '../product/product.service';
import { SubCategoryService } from '../sub-category/sub-category.service';
import {
  ListCategoriesResponse,
  LoginUserResponse,
  NewUserResponse,
  UserDetailsResponse,
} from './dto/interface';
import {
  UserLogin,
  UserSignup,
  UserCategoryList,
  UserSubCategoryList,
  UserCart,
  UpdateProfile,
} from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly subCategoryService: SubCategoryService,
    private readonly productService: ProductService,
  ) {}

  @Post('signup')
  @UseInterceptors(TransformInterceptor)
  async signup(
    @Body(ValidationPipe) payload: UserSignup,
  ): Promise<NewUserResponse> {
    return await this.userService.signup(payload);
  }

  @Post('login')
  @UseInterceptors(TransformInterceptor)
  async login(
    @Body(ValidationPipe) payload: UserLogin,
  ): Promise<LoginUserResponse> {
    return await this.userService.login(payload);
  }

  @Get('categories')
  @UseInterceptors(TransformInterceptor)
  async listCategories(
    @Query(new ValidationPipe()) query: UserCategoryList,
  ): Promise<ListCategoriesResponse> {
    return await this.userService.listCategories(query.limit);
  }

  @Get('subCategory')
  @UseInterceptors(TransformInterceptor)
  async listSubCategory(
    @Query(new ValidationPipe()) query: UserSubCategoryList,
  ) {
    return await this.subCategoryService.list(query.category_id);
  }

  @Post('cart')
  @UseInterceptors(TransformInterceptor)
  async cartDetails(@Body(new ValidationPipe()) payload: UserCart) {
    return await this.productService.cartItems(payload);
  }

  @Get('details')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async getUserDetails(@Req() request): Promise<UserDetailsResponse> {
    return await this.userService.getUserDetails(request.userId);
  }

  @Patch('details')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async updateUserDetails(
    @Body(new ValidationPipe()) payload: UpdateProfile,
    @Req() request,
  ): Promise<ApiResponse> {
    return await this.userService.updateUserDetails(payload, request.userId);
  }
}
