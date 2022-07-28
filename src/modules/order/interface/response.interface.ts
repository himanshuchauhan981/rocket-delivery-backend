import { ApiProperty } from '@nestjs/swagger';

import { Address } from 'src/modules/address/interface';
import {
  OrderProducts,
  UserPayment,
} from 'src/modules/admin/order/dto/admin-orders-response.dto';
import { OrderUser } from 'src/modules/admin/users/interface';
import { APIResponse } from 'src/modules/common/dto/common.dto';
import { ProductReview } from 'src/modules/product-review/interface';

class Order {
  @ApiProperty()
  id: number;

  @ApiProperty()
  order_number: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  net_amount: number;

  @ApiProperty()
  payment_method: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  payment_status: string;

  @ApiProperty({ type: OrderUser })
  user: OrderUser;

  @ApiProperty({ type: () => [OrderProducts] })
  order_products: OrderProducts[];

  @ApiProperty({ type: Address })
  address: Address;

  @ApiProperty({ type: () => UserPayment })
  payment: UserPayment;

  @ApiProperty({ type: () => [ProductReview] })
  product_review: ProductReview[];
}

class OrderList {
  @ApiProperty({ type: () => [Order] })
  orderList: Order[];

  @ApiProperty()
  totalOrders?: number;
}

class OrderListResponse extends APIResponse {
  @ApiProperty()
  data: OrderList;
}

export { OrderListResponse, Order };
