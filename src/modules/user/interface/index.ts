import { ApiResponse } from 'src/modules/admin/interface/admin';

interface Image {
  id: number;
  url: string;
}

interface Address {
  id: number;
  area: string;
  full_name: string;
  mobile_number: string;
  pincode: string;
  house_no: string;
  landmark: string;
}

interface Category {
  id: number;
  name: string;
  is_sub_category: number;
  image: Image;
}

interface SubCategory {
  id: number;
  name: string;
  category: Category;
  image: Image;
}

interface ProductPrice {
  actual_price: number;
}

interface CartProducts {
  id: number;
  name: string;
  is_active: number;
  max_quantity: number;
  minimum_cart_quantity: number;
  maximum_cart_quantity: number;
  product_price: ProductPrice;
  file: Image;
  available_quantity: number;
}

interface OrderPayment {
  id: number;
  payment_order_id: string;
  payment_id: string;
  card_type: string;
  created_at: Date;
}

interface NewUserResponse extends ApiResponse {
  data: {
    token: string;
    name: string;
  };
}

interface LoginUserResponse extends ApiResponse {
  data: {
    token: string;
    name: string;
    profile_photo: string;
  };
}

interface ListCategoriesResponse extends ApiResponse {
  data: {
    categoryList: Category[];
  };
}

interface ListSubCategoriesResponse extends ApiResponse {
  data: {
    subCategories: SubCategory[];
  };
}

interface UserCartDetailsResponse extends ApiResponse {
  data: {
    cartProductDetails: CartProducts[];
  };
}

interface ForgetPasswordResponse extends ApiResponse {
  data: {
    otpValidity: string;
    id: number;
  };
}

interface UserOrderTransactions extends ApiResponse {
  data: {
    transactions: {
      id: number;
      order_payments: OrderPayment[];
    };
  };
}

interface UserDetailsResponse extends ApiResponse {
  data: {
    userDetails: {
      name: string;
      email: string;
      mobile_number: string;
      country_code: string;
      id: number;
      created_at: Date;
      is_active: number;
      addresses: Address[];
    };
  };
}

export {
  NewUserResponse,
  LoginUserResponse,
  ListCategoriesResponse,
  UserDetailsResponse,
  ForgetPasswordResponse,
  UserOrderTransactions,
  ListSubCategoriesResponse,
  UserCartDetailsResponse,
};
