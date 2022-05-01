import { ApiResponse } from '../../dto/interface/admin';

interface CategoryWiseSales {
  id: number;
  name: string;
  totalSale?: number;
}

interface AdminDashboardResponse extends ApiResponse {
  data: {
    totalOrders: number;
    totalCategories: number;
    totalUsers: number;
    totalProducts: number;
    categoryWiseSales: CategoryWiseSales[];
    weeklyOrderSales: any;
  };
}

export { AdminDashboardResponse };
