import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { DashboardService } from './dashboard.service';
import {
  AdminDashboardOrderResponse,
  AdminDashboardProductResponse,
  AdminDashboardSalesResponse,
} from './interface/admin-dashboard-response.dto';

@Controller('admin/dashboard')
@ApiTags('Admin Dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('sales')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: AdminDashboardSalesResponse })
  dashboardSalesDetails(): Promise<AdminDashboardSalesResponse> {
    return this.dashboardService.dashboardSalesDetails();
  }

  @Get('order')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: AdminDashboardOrderResponse })
  dashboardOrderDetails(): Promise<AdminDashboardOrderResponse> {
    return this.dashboardService.dashboardOrderDetails();
  }

  @Get('products')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: AdminDashboardProductResponse })
  productDetails(): Promise<AdminDashboardProductResponse> {
    return this.dashboardService.productDetails();
  }
}
