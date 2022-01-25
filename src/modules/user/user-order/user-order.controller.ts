import { Body, Controller, Post, Req, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { OrderService } from 'src/modules/order/order.service';
import { NewOrder } from './dto/order.dto';

@Controller('user/order')
@ApiTags('User order')
export class UserOrderController {
	constructor(private readonly orderService: OrderService) {}
	
	@Post('new')
	@Auth('user')
	@UseInterceptors(TransformInterceptor)
	async create(@Body(new ValidationPipe()) payload: NewOrder, @Req() request) {
		return this.orderService.create(payload, request.userId);
	}
}
