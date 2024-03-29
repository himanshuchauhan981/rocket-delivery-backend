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

import { Auth } from '../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../core/interceptors/transform.interceptor';
import { ProductService } from '../product/product.service';
import { SubCategoryService } from '../sub-category/sub-category.service';
import {
  ListCategoriesResponse,
  ListSubCategoriesResponse,
  LoginUserResponse,
  NewUserResponse,
  UserCartDetailsResponse,
  UserDetailsResponse,
} from './interface';
import {
  UserLogin,
  UserSignup,
  UserCategoryList,
  UserSubCategoryList,
  UserCart,
  UpdateProfile,
  DeliveryCharges,
} from './dto/user.dto';
import { UserService } from './user.service';
import { ApiResponse } from '../common/interface';

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
  signup(@Body(ValidationPipe) payload: UserSignup): Promise<NewUserResponse> {
    return this.userService.signup(payload);
  }

  @Post('login')
  @UseInterceptors(TransformInterceptor)
  login(@Body(ValidationPipe) payload: UserLogin): Promise<LoginUserResponse> {
    return this.userService.login(payload);
  }

  @Get('categories')
  @UseInterceptors(TransformInterceptor)
  listCategories(
    @Query(new ValidationPipe()) query: UserCategoryList,
  ): Promise<ListCategoriesResponse> {
    return this.userService.listCategories(query.limit);
  }

  @Get('subCategory')
  @UseInterceptors(TransformInterceptor)
  listSubCategory(
    @Query(new ValidationPipe()) query: UserSubCategoryList,
  ): Promise<ListSubCategoriesResponse> {
    return this.subCategoryService.list(query.category_id);
  }

  @Post('cart')
  @UseInterceptors(TransformInterceptor)
  cartDetails(
    @Body(new ValidationPipe()) payload: UserCart,
  ): Promise<UserCartDetailsResponse> {
    return this.productService.cartItems(payload);
  }

  @Get('deliveryCharges')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  calculateDeliveryCharges(@Query() params: DeliveryCharges, @Req() request) {
    return this.userService.calculateDeliveryCharges(params, request.userId);
  }

  @Get('details')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  getUserDetails(@Req() request): Promise<UserDetailsResponse> {
    return this.userService.getUserDetails(request.userId);
  }

  @Patch('details')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  updateUserDetails(
    @Body(new ValidationPipe()) payload: UpdateProfile,
    @Req() request,
  ): Promise<ApiResponse> {
    return this.userService.updateUserDetails(payload, request.userId);
  }
}
