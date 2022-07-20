import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

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
  @IsInt()
  country_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  state_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  city_id: number;

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
  mobile_number: string;
}

export class AddressId {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}
