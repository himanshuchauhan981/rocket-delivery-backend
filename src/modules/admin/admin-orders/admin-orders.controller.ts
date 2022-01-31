import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { OrderService } from 'src/modules/order/order.service';

@Controller('admin/orders')
@ApiTags('Admin orders')
export class AdminOrdersController {

  constructor(private readonly orderService: OrderService) {}

  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async list() {
    return await this.orderService.adminOrderList();
  }
}
