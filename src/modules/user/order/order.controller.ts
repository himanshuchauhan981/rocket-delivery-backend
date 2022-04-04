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

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { ApiResponse } from 'src/modules/admin/dto/interface/admin';
import { OrderService } from 'src/modules/order/order.service';
import { NewOrder, SpecificOrder } from './dto/order.dto';

@Controller('user/order')
@ApiTags('User order')
export class UserOrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('new')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async create(
    @Body(new ValidationPipe()) payload: NewOrder,
    @Req() request,
  ): Promise<ApiResponse> {
    return await this.orderService.create(payload, request.userId);
  }

  @Get('list')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async list(@Req() request) {
    return await this.orderService.list(request.userId);
  }

  @Get(':id')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async findOneById(@Param(new ValidationPipe()) params: SpecificOrder) {
    return await this.orderService.findOneById(params.id);
  }

  @Get(':id/cancel')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async cancelOrder(
    @Param(new ValidationPipe()) params: SpecificOrder,
    @Req() request,
  ): Promise<ApiResponse> {
    return await this.orderService.cancelOrder(
      params.id,
      request.userId,
      request.role,
    );
  }
}
