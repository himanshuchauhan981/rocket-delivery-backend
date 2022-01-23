import { Body, Controller, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { UserLogin, UserSignup } from './dto/user.dto';
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
}
