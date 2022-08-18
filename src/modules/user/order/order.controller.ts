import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { OrderService } from './order.service';
import { NewOrder, SpecificOrder } from './dto/order.dto';
import { CommonOrderService } from '../../order/order.service';
import { APIResponse } from 'src/modules/common/dto/common.dto';

@Controller('user/order')
@ApiTags('User order')
export class UserOrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly commonOrderService: CommonOrderService,
  ) {}

  @Post('new')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  create(@Body(new ValidationPipe()) payload: NewOrder, @Req() request) {
    return this.orderService.create(payload, request.userId, request.role);
  }

  @Get('list')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  list(@Req() request) {
    return this.orderService.list(request.userId);
  }

  @Get(':id')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  findOneById(@Param(new ValidationPipe()) params: SpecificOrder) {
    return this.commonOrderService.findOneById(params.id);
  }

  @Get(':id/cancel')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  cancelOrder(
    @Param(new ValidationPipe()) params: SpecificOrder,
    @Req() request,
  ): Promise<APIResponse> {
    return this.orderService.cancelOrder(
      params.id,
      request.userId,
      request.role,
    );
  }
}
