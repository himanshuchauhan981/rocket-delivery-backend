import { Address } from 'src/modules/address/interface';
import {
  OrderProducts,
  UserPayment,
} from 'src/modules/admin/order/interface/response.interface';
import { OrderUser } from 'src/modules/admin/users/interface';
import { ApiResponse } from 'src/modules/common/interface';
import { ProductReview } from 'src/modules/product-review/interface';

interface Order {
  id: number;
  order_number: string;
  status: string;
  net_amount: number;
  payment_method: string;
  created_at: Date;
  payment_status: string;
  user: OrderUser;
  order_products: OrderProducts[];
  address: Address;
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
