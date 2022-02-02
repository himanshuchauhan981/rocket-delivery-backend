import { Controller, Get, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { OrderService } from 'src/modules/order/order.service';
import { OrdersList } from './dto/admin-orders.entity';

@Controller('admin/orders')
@ApiTags('Admin orders')
export class AdminOrdersController {

  constructor(private readonly orderService: OrderService) {}

  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async list(@Query(new ValidationPipe()) query: OrdersList) {
    return await this.orderService.adminOrderList(query);
  }
}
