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

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { OrderListResponse } from '../../order/interface/response.interface';
import { SpecificOrder } from '../../../modules/user/order/dto/order.dto';
import { OrdersList, UpdateOrder } from './dto/admin-orders.entity';
import { SpecificOrderResponse } from './interface/response.interface';
import { OrderService } from './order.service';
import { CommonOrderService } from '../../order/order.service';
import { ApiResponse } from 'src/modules/common/interface';

@Controller('admin/orders')
@ApiTags('Admin orders')
export class AdminOrdersController {
  constructor(
    private readonly orderService: OrderService,
    private readonly commonOrderService: CommonOrderService,
  ) {}

  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  list(
    @Query(new ValidationPipe()) query: OrdersList,
  ): Promise<OrderListResponse> {
    return this.orderService.adminOrderList(query);
  }

  @Get(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  findOneById(
    @Param(new ValidationPipe()) params: SpecificOrder,
  ): Promise<SpecificOrderResponse> {
    return this.commonOrderService.findOneById(params.id);
  }

  @Put(':id/status')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  updateOrder(
    @Body(new ValidationPipe()) payload: UpdateOrder,
    @Param(new ValidationPipe()) params: SpecificOrder,
  ): Promise<ApiResponse> {
    return this.orderService.updateOrderStatus(payload, params.id);
  }

  @Get(':id/invoice')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  downloadInvoice(@Param(new ValidationPipe()) params: SpecificOrder) {
    return this.orderService.downloadInvoice(params.id);
  }
}
