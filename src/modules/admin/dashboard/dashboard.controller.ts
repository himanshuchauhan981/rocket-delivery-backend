import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { DashboardService } from './dashboard.service';
import {
  AdminDashboardOrderResponse,
  AdminDashboardProductResponse,
  AdminDashboardSalesResponse,
} from './interface/response.interface';

@Controller('admin/dashboard')
@ApiTags('Admin Dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('sales')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async dashboardSalesDetails(): Promise<AdminDashboardSalesResponse> {
    return await this.dashboardService.dashboardSalesDetails();
  }

  @Get('order')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async dashboardOrderDetails(): Promise<AdminDashboardOrderResponse> {
    return await this.dashboardService.dashboardOrderDetails();
  }

  @Get('products')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async productDetails(): Promise<AdminDashboardProductResponse> {
    return await this.dashboardService.productDetails();
  }
}
