import { ApiResponse } from 'src/modules/common/interface';
import { Order } from 'src/modules/order/interface/response.interface';

interface OrderProducts {
  id: number;
  product_id?: number;
  product_name?: string;
  product_image?: string;
  price?: number;
  quantity?: number;
}

interface UserPayment {
  id: number;
}

interface SpecificOrderResponse extends ApiResponse {
  data: {
    orderDetails: Order;
  };
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
