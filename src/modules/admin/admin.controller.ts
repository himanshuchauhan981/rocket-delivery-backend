import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { AddressService } from '../address/address.service';
import { AddressId, NewAddress } from '../user/user-address/dto/address.dto';
import { AdminService } from './admin.service';
import { AdminLogin } from './dto/admin.dto';
import { AdminLoginResponse } from './dto/interface/admin';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly addressService: AddressService,
  ) {}

  @Post('login')
  @UseInterceptors(TransformInterceptor)
  async login(
    @Body(new ValidationPipe()) payload: AdminLogin,
  ): Promise<AdminLoginResponse> {
    return await this.adminService.login(payload);
  }

  @Put('address/:id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async updateAddress(
    @Body(new ValidationPipe()) payload: NewAddress,
    @Param(new ValidationPipe()) params: AddressId,
  ) {
    return await this.addressService.update(payload, params.id);
  }
}
