import { Body, Controller, Get, Param, Post, Put, Req, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { Auth } from 'src/core/decorators/auth.decorator';
import { AddressService } from 'src/modules/address/address.service';
import { NewAddress,AddressId } from './dto/address.dto';

@Controller('user/address')
@ApiTags('Address')
export class UserAddressController {

	constructor(private readonly addressService: AddressService) {}

	@Get('list')
	@Auth('user')
	@UseInterceptors(TransformInterceptor)
	async findByUserId(@Req() req) {
		return await this.addressService.findAllByUserId(req.userId);
	}

	@Post('')
	@Auth('user')
	@UseInterceptors(TransformInterceptor)
	async add(@Body(new ValidationPipe()) payload: NewAddress, @Req() req) {
		return await this.addressService.add(payload, req.userId);
	}

	@Put(':id')
	@Auth('user')
	@UseInterceptors(TransformInterceptor)
	async update(@Body(new ValidationPipe()) payload: NewAddress, @Param() params: AddressId) {
		return await this.addressService.update(payload, params.id);
	}
}
