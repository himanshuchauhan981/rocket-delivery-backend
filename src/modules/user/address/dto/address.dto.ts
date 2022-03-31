import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NewAddress {
  @ApiProperty()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  pincode: string;

  @ApiProperty()
  @IsNotEmpty()
  house_no: string;

  @ApiProperty()
  @IsNotEmpty()
  area: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  landmark: string;

  @ApiProperty()
  @IsNotEmpty()
  latitude: string;

  @ApiProperty()
  @IsNotEmpty()
  longitude: string;

  @ApiProperty()
  @IsNotEmpty()
  country_code: string;

  @ApiProperty()
  @IsNotEmpty()
  mobile_number: string;
}

export class AddressId {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}
