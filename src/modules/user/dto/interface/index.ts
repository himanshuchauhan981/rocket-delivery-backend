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

interface Category {
  id: number;
  name: string;
  is_sub_category: number;
  image: Image;
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
    };
  };
}

interface ForgetPasswordResponse extends ApiResponse {
  data: {
    otpValidity: string;
  }
}

export {
  ListUsersResponse,
  NewUserResponse,
  LoginUserResponse,
  ListCategoriesResponse,
  UserDetailsResponse,
  ForgetPasswordResponse,
};
