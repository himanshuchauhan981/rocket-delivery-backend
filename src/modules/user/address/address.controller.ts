import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { Auth } from '../../../core/decorators/auth.decorator';
import { AddressService as CommonAddressService } from '../../../modules/address/address.service';
import { NewAddress, AddressId } from './dto/address.dto';
import { AddressService } from './address.service';

@Controller('user/address')
@ApiTags('Address')
export class UserAddressController {
  constructor(
    private readonly addressService: AddressService,
    private readonly commonAddressService: CommonAddressService,
  ) {}

  @Get('list')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  findByUserId(@Req() req) {
    return this.addressService.findAllByUserId(req.userId);
  }

  @Post('new')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  add(@Body(new ValidationPipe()) payload: NewAddress, @Req() req) {
    return this.addressService.add(payload, req.userId);
  }

  @Patch(':id')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  update(
    @Body(new ValidationPipe()) payload: NewAddress,
    @Param() params: AddressId,
  ) {
    return this.commonAddressService.update(payload, params.id);
  }
}
