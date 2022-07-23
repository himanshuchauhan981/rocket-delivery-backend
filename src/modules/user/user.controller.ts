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
  ForgetPasswordResponse,
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
  UserEmail,
  VerifyPassword,
  ResetPassword,
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
  async signup(
    @Body(ValidationPipe) payload: UserSignup,
  ): Promise<NewUserResponse> {
    return this.userService.signup(payload);
  }

  @Post('login')
  @UseInterceptors(TransformInterceptor)
  async login(
    @Body(ValidationPipe) payload: UserLogin,
  ): Promise<LoginUserResponse> {
    return this.userService.login(payload);
  }

  @Get('categories')
  @UseInterceptors(TransformInterceptor)
  async listCategories(
    @Query(new ValidationPipe()) query: UserCategoryList,
  ): Promise<ListCategoriesResponse> {
    return this.userService.listCategories(query.limit);
  }

  @Get('subCategory')
  @UseInterceptors(TransformInterceptor)
  async listSubCategory(
    @Query(new ValidationPipe()) query: UserSubCategoryList,
  ): Promise<ListSubCategoriesResponse> {
    return this.subCategoryService.list(query.category_id);
  }

  @Post('cart')
  @UseInterceptors(TransformInterceptor)
  async cartDetails(
    @Body(new ValidationPipe()) payload: UserCart,
  ): Promise<UserCartDetailsResponse> {
    return this.productService.cartItems(payload);
  }

  @Get('deliveryCharges')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async calculateDeliveryCharges(
    @Query() params: DeliveryCharges,
    @Req() request,
  ) {
    return this.userService.calculateDeliveryCharges(params, request.userId);
  }

  @Get('details')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async getUserDetails(@Req() request): Promise<UserDetailsResponse> {
    return this.userService.getUserDetails(request.userId);
  }

  @Patch('details')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async updateUserDetails(
    @Body(new ValidationPipe()) payload: UpdateProfile,
    @Req() request,
  ): Promise<ApiResponse> {
    return this.userService.updateUserDetails(payload, request.userId);
  }

  @Patch('password/forget')
  @UseInterceptors(TransformInterceptor)
  async forgetPassword(
    @Body(new ValidationPipe()) payload: UserEmail,
  ): Promise<ForgetPasswordResponse> {
    return this.userService.forgetPassword(payload.email);
  }

  @Patch('password/verify')
  @UseInterceptors(TransformInterceptor)
  async verifyPassword(
    @Body(new ValidationPipe()) payload: VerifyPassword,
  ): Promise<ApiResponse> {
    return this.userService.verifyPassword(payload);
  }

  @Patch('password/reset')
  @UseInterceptors(TransformInterceptor)
  async resetPassword(@Body(new ValidationPipe()) payload: ResetPassword) {
    return this.userService.resetPassword(payload.id, payload.new_password);
  }
}
