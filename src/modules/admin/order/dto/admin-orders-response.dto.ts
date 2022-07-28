import { ApiProperty } from '@nestjs/swagger';
import { APIResponse } from 'src/modules/common/dto/common.dto';
import { ApiResponse } from 'src/modules/common/interface';
import { Order } from 'src/modules/order/interface/response.interface';

class OrderProducts {
  @ApiProperty()
  id: number;

  @ApiProperty()
  product_id?: number;

  @ApiProperty()
  product_name?: string;

  @ApiProperty()
  product_image?: string;

  @ApiProperty()
  price?: number;

  @ApiProperty()
  quantity?: number;
}

class UserPayment {
  @ApiProperty()
  id: number;
}

class SpecificOrder {
  @ApiProperty({ type: () => Order })
  orderDetails: Order;
}

class SpecificOrderResponse extends APIResponse {
  @ApiProperty()
  data: SpecificOrder;
}

interface OrderInvoiceResponse extends ApiResponse {
  responseType: string;
  data: {
    pdf: Buffer;
  };
}

export {
  SpecificOrderResponse,
  UserPayment,
  OrderProducts,
  OrderInvoiceResponse,
};
