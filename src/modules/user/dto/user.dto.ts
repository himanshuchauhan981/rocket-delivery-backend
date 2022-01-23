import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSignup {
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

export class UserLogin {
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

export class UserProducts {
  @ApiProperty({required: false})
  category_id: number;

  @ApiProperty({required: false})
  sub_category_id: number;
}

export class SpecificProduct {
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}

class Cart {
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  quantity: number;
}

export class UserCart {
  @ApiProperty()
  @IsNotEmpty()
  cartItems: Cart[];

  @ApiProperty()
  @IsNotEmpty()
  removeCartItem: boolean;
}