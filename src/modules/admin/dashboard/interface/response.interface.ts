import { ApiResponse } from 'src/modules/common/interface';
import { ProductPrice } from 'src/modules/product/product-price.entity';

interface CategoryWiseSales {
  id: number;
  name: string;
  totalSale?: number;
}

interface OrderDetails {
  total: number;
  status: string;
}

interface OrderRevenue {
  totalRevenue: number;
  orderDate: string;
}

interface RecentProducts {
  id: number;
  name: string;
  max_quantity: number;
  product_price: ProductPrice;
  file: {
    id: number;
    url: string;
  };
}

interface AdminDashboardSalesResponse extends ApiResponse {
  data: {
    totalOrders: number;
    totalCategories: number;
    totalUsers: number;
    totalProducts: number;
    categoryWiseSales: CategoryWiseSales[];
    weeklyOrderSales: any;
  };
}

interface AdminDashboardOrderResponse extends ApiResponse {
  data: {
    orderDetails: OrderDetails[];
    orderRevenue: OrderRevenue[];
  };
}

interface AdminDashboardProductResponse extends ApiResponse {
  data: {
    recentProducts: RecentProducts[];
  };
}

export {
  AdminDashboardSalesResponse,
  AdminDashboardOrderResponse,
  AdminDashboardProductResponse,
};
