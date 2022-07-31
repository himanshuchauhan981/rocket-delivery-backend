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
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { USER_TYPE } from 'src/core/constants/constants';

import { Auth } from '../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../core/interceptors/transform.interceptor';
import { AddressService } from '../address/address.service';
import { APIResponse } from '../common/dto/common.dto';
import { AddressId, NewAddress } from '../user/address/dto/address.dto';
import { AdminService } from './admin.service';
import {
  AdminDetailsResponse,
  AdminLogin,
  AdminLoginSuccessResponse,
} from './dto/admin.dto';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly addressService: AddressService,
  ) {}

  @Post('login')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({
    type: AdminLoginSuccessResponse,
    description: 'Correct Credentials',
  })
  @ApiUnauthorizedResponse({
    type: APIResponse,
    description: 'Incorrect Credentials',
  })
  login(
    @Body(new ValidationPipe()) payload: AdminLogin,
  ): Promise<AdminLoginSuccessResponse | APIResponse> {
    return this.adminService.login(payload);
  }

  @Put('address/:id')
  @Auth(USER_TYPE.ADMIN)
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({
    type: APIResponse,
    description: 'Address Updated successfully',
  })
  @ApiNotFoundResponse({ type: APIResponse, description: 'Invalid address ID' })
  updateAddress(
    @Body(new ValidationPipe()) payload: NewAddress,
    @Param(new ValidationPipe()) params: AddressId,
  ) {
    return this.addressService.update(payload, params.id);
  }

  @Get('details')
  @Auth(USER_TYPE.ADMIN)
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: AdminDetailsResponse })
  adminDetails(@Req() request): Promise<AdminDetailsResponse> {
    return this.adminService.adminDetails(request.userId);
  }
}
