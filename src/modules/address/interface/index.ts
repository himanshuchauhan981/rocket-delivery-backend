import { ApiProperty } from '@nestjs/swagger';

class Address {
  @ApiProperty()
  id: number;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  house_no: string;

  @ApiProperty()
  area: string;

  @ApiProperty()
  landmark: string;

  @ApiProperty()
  mobile_number: string;
  pincode: string;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;
}

export { Address };
