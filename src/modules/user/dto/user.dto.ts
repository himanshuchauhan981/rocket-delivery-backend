import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UserSignup {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  country_code: string;

  @IsNotEmpty()
  @ApiProperty()
  mobile_number: string;

  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsNotEmpty()
  @ApiProperty()
  fcm_token: string;
}

class UserLogin {
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  fcm_token: string;
}

export class UserCategoryList {
  @IsNotEmpty()
  @ApiProperty()
  limit: number;
}

export class UserSubCategoryList {
  @IsNotEmpty()
  @ApiProperty()
  category_id: number;
}

class UserProducts {
  @ApiProperty({ required: false })
  category_id: number;

  @ApiProperty({ required: false })
  sub_category_id: number;

  @ApiProperty()
  @IsNotEmpty()
  page: number;

  @ApiProperty()
  @IsNotEmpty()
  limit: number;
}

class SpecificProduct {
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}

class SimilarProducts {
  @IsNotEmpty()
  @ApiProperty()
  category_id: number;

  @IsNotEmpty()
  @ApiProperty()
  product_id: number;
}

class Cart {
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  quantity: number;
}

class UserCart {
  @ApiProperty()
  @IsNotEmpty()
  cart_items: Cart[];
}

class UpdateProfile {
  @ApiProperty({ required: false })
  email: string;

  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  mobile_number: string;

  @ApiProperty({ required: false })
  password: string;
}

class UserEmail {
  @ApiProperty()
  email: string;
}

class VerifyPassword {
  @ApiProperty()
  email: string;

  @ApiProperty()
  otp: string;
}

class ResetPassword {
  @ApiProperty()
  id: number;

  @ApiProperty()
  new_password: string;
}

class DeliveryCharges {
  @ApiProperty()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty()
  @IsNotEmpty()
  longitude: number;
}

export {
  UserSignup,
  UserLogin,
  UserProducts,
  SpecificProduct,
  SimilarProducts,
  UserCart,
  UpdateProfile,
  UserEmail,
  VerifyPassword,
  ResetPassword,
  DeliveryCharges,
};
