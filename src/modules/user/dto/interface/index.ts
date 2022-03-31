import { ApiResponse } from 'src/modules/admin/dto/interface/admin';

interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  mobile_number: string;
  is_active: number;
  profile_image: string;
}

interface Image {
  id: number;
  url: string;
}

interface Address {
  id: number;
  area: string;
  city: string;
  state: string;
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

interface OrderPayment {
  id: number;
  payment_order_id: string;
  payment_id: string;
  card_type: string;
  created_at: Date;
}

interface ListUsersResponse extends ApiResponse {
  data: {
    userList: User[];
    count: number;
  };
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
      // order_payments: OrderPayment[];
    }
  }
}

export {
  ListUsersResponse,
  NewUserResponse,
  LoginUserResponse,
  ListCategoriesResponse,
  UserDetailsResponse,
  ForgetPasswordResponse,
  UserOrderTransactions,
};
