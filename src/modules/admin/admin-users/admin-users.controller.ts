import { Controller, Get, Query, UseInterceptors, ValidationPipe, Patch, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/core/decorators/auth.decorator';

import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { UserService } from 'src/modules/user/user.service';
import { NewPassword, ResetPassword, UsersList } from './dto/admin-users.entity';

@Controller('admin/users')
@ApiTags('Admin user')
export class AdminUsersController {

  constructor(private readonly userService: UserService) {}
  
  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async list(@Query(new ValidationPipe()) payload: UsersList) {
    return await this.userService.listUsers(payload);
  }

  @Patch(':id/resetPassword')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async resetPassword(@Param(new ValidationPipe()) params: ResetPassword, @Body(new ValidationPipe()) payload: NewPassword) {
    return await this.userService.resetPassword(params.id, payload.newPassword);
  }
  
}
