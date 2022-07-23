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

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { UsersService } from './users.service';
import { UserService as UserCommonService } from '../../user/user.service';
import {
  NewPassword,
  UserIdParams,
  UsersList,
  UserStatus,
  UserDetailList,
} from './dto/admin-users.entity';
import {
  DownloadUserCSVResponse,
  ListUsersResponse,
} from './interface/response.interface';
import { ApiResponse } from 'src/modules/common/interface';

@Controller('admin/users')
@ApiTags('Admin user')
export class AdminUsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly userCommonService: UserCommonService,
  ) {}

  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  list(
    @Query(new ValidationPipe()) payload: UsersList,
  ): Promise<ListUsersResponse> {
    return this.userService.listUsers(payload);
  }

  @Get('csv')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  downloadUsersCSV(): Promise<DownloadUserCSVResponse> {
    return this.userService.downloadUsersCSV();
  }

  @Get(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  viewUser(@Param(new ValidationPipe()) params: UserIdParams) {
    return this.userCommonService.getUserDetails(params.id);
  }

  @Get(':id/transactions')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  userTransactions(
    @Param(new ValidationPipe()) params: UserIdParams,
    @Query(new ValidationPipe()) payload: UserDetailList,
  ) {
    return this.userService.userTransactions(params.id, payload);
  }

  @Get(':id/orders')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  adminUserOrders(
    @Param(new ValidationPipe()) params: UserIdParams,
    @Query(new ValidationPipe()) payload: UserDetailList,
  ) {
    return this.userService.adminUserOrders(params.id, payload);
  }

  @Patch(':id/resetPassword')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  resetPassword(
    @Param(new ValidationPipe()) params: UserIdParams,
    @Body(new ValidationPipe()) payload: NewPassword,
  ): Promise<ApiResponse> {
    return this.userCommonService.resetPassword(
      params.id,
      payload.new_password,
    );
  }

  @Patch(':id/status')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  changeUserStatus(
    @Param(new ValidationPipe()) params: UserIdParams,
    @Body(new ValidationPipe()) payload: UserStatus,
  ) {
    return this.userService.updateUserStatus(params.id, payload.is_active);
  }
}
