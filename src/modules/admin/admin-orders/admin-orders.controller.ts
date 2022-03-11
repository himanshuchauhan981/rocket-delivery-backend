import {
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
  ValidationPipe,
  Put,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { OrderListResponse, SpecificOrderResponse } from 'src/modules/order/dto/order-response.dto';
import { OrderService } from 'src/modules/order/order.service';
import {
  SpecificOrder,
  UpdateOrder,
} from 'src/modules/user/user-order/dto/order.dto';
import { ApiResponse } from '../dto/interface/admin';
import { OrdersList } from './dto/admin-orders.entity';

@Controller('admin/orders')
@ApiTags('Admin orders')
export class AdminOrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async list(@Query(new ValidationPipe()) query: OrdersList): Promise<OrderListResponse> {
    return await this.orderService.adminOrderList(query);
  }

  @Get(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async findOneById(@Param(new ValidationPipe()) params: SpecificOrder): Promise<SpecificOrderResponse> {
    return await this.orderService.findOneById(params.id);
  }

  @Put(':id/status')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async updateOrder(
    @Body(new ValidationPipe()) payload: UpdateOrder,
    @Param(new ValidationPipe()) params: SpecificOrder,
  ): Promise<ApiResponse> {
    return await this.orderService.updateOrderStatus(payload, params.id);
  }
}
