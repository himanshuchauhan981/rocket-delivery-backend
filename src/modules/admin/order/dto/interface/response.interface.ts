import { ApiResponse } from 'src/modules/admin/dto/interface/admin';

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

interface User {
  id: number;
  name: string;
  email?: string;
  mobile_number?: string;
}

interface OrderProducts {
  id: number;
  product_id?: number;
  product_name?: string;
  product_image?: string;
  price?: number;
  quantity?: number;
}

interface OrderAddress {
  id: number;
  full_name: string;
  house_no: string;
  area: string;
  city: string;
  state: string;
  landmark: string;
  country_code: string;
  mobile_number: string;
  pincode: string;
  latitude: number;
  longitude: number;
}

interface ProductReview {
  id: number;
  headline: string;
  opinion: string;
  ratings: number;
  product_id: number;
  review_images: ReviewImages[];
}

interface ReviewImages {
  id: number;
  url: string;
}

interface UserPayment {
  id: number;
}

interface OrderListResponse extends ApiResponse {
  data: {
    orderList: Order[];
    totalOrders?: number;
  };
}

interface SpecificOrderResponse extends ApiResponse {
  data: {
    orderDetails: Order;
  };
}

export { OrderListResponse, SpecificOrderResponse };
