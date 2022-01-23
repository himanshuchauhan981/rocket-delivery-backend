import { Body, Controller, Get, Post, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { UserLogin, UserSignup, UserCategoryList } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
	constructor(private readonly userService: UserService) {}

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
}
