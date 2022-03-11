import { APIResponse } from "src/modules/category/dto/category-response.dto";

class User {
  id: number;
  name: string;
  email?: string;
  mobile_number?: string;
}

class OrderProducts {
  id: number;
  product_id?: number;
  product_name?: string;
  product_image?: string;
  price?: number;
  quantity?: number;
}

class OrderAddress {
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

class ReviewImages {
  id: number;
  url: string;
}

class ProductReview {
  id: number;
  headline: string;
  opinion: string;
  ratings: number;
  product_id: number;
  review_images: ReviewImages[];
}

class UserPayment {
  id: number;
}

class Order {
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

class OrderListResponse extends APIResponse {
  data: {
    orderList: Order[];
    totalOrders?: number;
  }
}

class SpecificOrderResponse extends APIResponse {
  data: {
    orderDetails: Order;
  }
}

export { OrderListResponse, SpecificOrderResponse };