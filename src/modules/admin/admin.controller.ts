import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../core/interceptors/transform.interceptor';
import { AddressService } from '../address/address.service';
import { AddressId, NewAddress } from '../user/address/dto/address.dto';
import { AdminService } from './admin.service';
import { AdminLogin } from './dto/admin.dto';
import { AdminDetailsResponse, AdminLoginResponse } from './interface';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly addressService: AddressService,
  ) {}

  @Post('login')
  @UseInterceptors(TransformInterceptor)
  login(
    @Body(new ValidationPipe()) payload: AdminLogin,
  ): Promise<AdminLoginResponse> {
    return this.adminService.login(payload);
  }

  @Put('address/:id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  updateAddress(
    @Body(new ValidationPipe()) payload: NewAddress,
    @Param(new ValidationPipe()) params: AddressId,
  ) {
    return this.addressService.update(payload, params.id);
  }

  @Get('details')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  adminDetails(@Req() request): Promise<AdminDetailsResponse> {
    return this.adminService.adminDetails(request.userId);
  }
}
