import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  ValidationPipe,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { OrderService } from 'src/modules/order/order.service';

import { ListUsersResponse } from 'src/modules/user/dto/interface';
import { UserService } from 'src/modules/user/user.service';
import { ApiResponse } from '../dto/interface/admin';
import {
  NewPassword,
  UserIdParams,
  UsersList,
  UserStatus,
  UserDetailList,
} from './dto/admin-users.entity';

@Controller('admin/users')
@ApiTags('Admin user')
export class AdminUsersController {
  constructor(private readonly userService: UserService, private orderService: OrderService) {}

  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async list(
    @Query(new ValidationPipe()) payload: UsersList,
  ): Promise<ListUsersResponse> {
    return await this.userService.listUsers(payload);
  }

  @Get(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async viewUser(@Param(new ValidationPipe()) params: UserIdParams) {
    return await this.userService.getUserDetails(params.id);
  }

  @Get(':id/transactions')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async userTransactions(
    @Param(new ValidationPipe()) params: UserIdParams,
    @Query(new ValidationPipe()) payload: UserDetailList
  ) {
    return await this.userService.userTransactions(params.id, payload);
  }

  @Get(':id/orders')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async adminUserOrders(
    @Param(new ValidationPipe()) params: UserIdParams,
    @Query(new ValidationPipe()) payload: UserDetailList
  ) {
    return await this.orderService.adminUserOrders(params.id, payload);
  }

  @Patch(':id/resetPassword')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async resetPassword(
    @Param(new ValidationPipe()) params: UserIdParams,
    @Body(new ValidationPipe()) payload: NewPassword,
  ): Promise<ApiResponse> {
    return await this.userService.resetPassword(
      params.id,
      payload.newPassword,
    );
  }

  @Patch(':id/status')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async changeUserStatus(
    @Param(new ValidationPipe()) params: UserIdParams,
    @Body(new ValidationPipe()) payload: UserStatus,
  ) {
    return await this.userService.updateUserStatus(
      params.id,
      payload.is_active,
    );
  }
}