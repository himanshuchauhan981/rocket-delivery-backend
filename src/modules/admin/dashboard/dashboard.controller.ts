import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { DashboardService } from './dashboard.service';
import { AdminDashboardResponse } from './dto/dashboard';

@Controller('admin/dashboard')
@ApiTags('Admin Dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('sales')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async dashboardSalesDetails(): Promise<AdminDashboardResponse> {
    return await this.dashboardService.dashboardSalesDetails();
  }

  @Get('order')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async dashboardOrderDetails() {
    return await this.dashboardService.dashboardOrderDetails();
  }

  @Get('products')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async productDetails() {
    return await this.dashboardService.productDetails();
  }
}
