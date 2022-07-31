import {
  Body,
  Controller,
  Patch,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { APIResponse } from 'src/modules/common/dto/common.dto';
import { UserService } from '../user.service';
import { ForgetPasswordResponse } from './dto/password-response.entity';
import {
  ResetPassword,
  UserEmail,
  VerifyPassword,
} from './dto/password.entity';
import { PasswordService } from './password.service';

@Controller('admin/password')
@ApiTags('Password reset')
export class PasswordController {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userCommonService: UserService,
  ) {}

  @Patch('forget')
  @UseInterceptors(TransformInterceptor)
  forgetPassword(
    @Body(new ValidationPipe()) payload: UserEmail,
  ): Promise<ForgetPasswordResponse> {
    return this.passwordService.forgetPassword(payload.email);
  }

  @Patch('verify')
  @UseInterceptors(TransformInterceptor)
  verifyPassword(
    @Body(new ValidationPipe()) payload: VerifyPassword,
  ): Promise<APIResponse> {
    return this.passwordService.verifyPassword(payload);
  }

  @Patch('reset')
  @UseInterceptors(TransformInterceptor)
  resetPassword(@Body(new ValidationPipe()) payload: ResetPassword) {
    return this.userCommonService.resetPassword(
      payload.id,
      payload.new_password,
    );
  }
}
