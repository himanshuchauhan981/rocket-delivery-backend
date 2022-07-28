import { ApiProperty } from '@nestjs/swagger';

import { APIResponse } from 'src/modules/common/dto/common.dto';
import { ProductPrice } from 'src/modules/product/product-price.entity';
import { FileResponse } from '../../file/dto/file-response.dto';

class CategoryWiseSales {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  totalSale?: number;
}

class OrderDetails {
  @ApiProperty()
  total: number;

  @ApiProperty()
  status: string;
}

class OrderRevenue {
  @ApiProperty()
  totalRevenue: number;

  @ApiProperty()
  orderDate: string;
}

class RecentProducts {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  max_quantity: number;

  @ApiProperty()
  product_price: ProductPrice;

  @ApiProperty()
  file: FileResponse;
}

class AdminDashboardSales {
  @ApiProperty()
  totalOrders: number;

  @ApiProperty()
  totalCategories: number;

  @ApiProperty()
  totalUsers: number;

  @ApiProperty()
  categoryWiseSales: CategoryWiseSales[];

  @ApiProperty()
  weeklyOrderSales: any;

  @ApiProperty()
  totalProducts: number;
}

class AdminDashboardSalesResponse extends APIResponse {
  @ApiProperty()
  data: AdminDashboardSales;
}

class AdminDashboardOrder {
  @ApiProperty()
  orderDetails: OrderDetails[];

  @ApiProperty()
  orderRevenue: OrderRevenue[];
}

class AdminDashboardOrderResponse extends APIResponse {
  @ApiProperty()
  data: AdminDashboardOrder;
}

class AdminDashboardProductResponse extends APIResponse {
  @ApiProperty()
  data: { recentProducts: RecentProducts[] };
}

export {
  AdminDashboardSalesResponse,
  AdminDashboardOrderResponse,
  AdminDashboardProductResponse,
};
