import { ApiResponse } from 'src/modules/admin/interface/admin';
import {
  OrderProducts,
  ProductReview,
  User,
  UserPayment,
  OrderAddress,
} from 'src/modules/admin/order/interface/response.interface';

interface Order {
  id: number;
  order_number: string;
  status: string;
  net_amount: number;
  payment_method: number;
  created_at: Date;
  payment_status: string;
  user: User;
  order_products: OrderProducts[];
  address: OrderAddress;
  payment: UserPayment;
  product_review: ProductReview[];
}

interface OrderListResponse extends ApiResponse {
  data: {
    orderList: Order[];
    totalOrders?: number;
  };
}

export { OrderListResponse, Order };
