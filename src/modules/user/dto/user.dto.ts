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
