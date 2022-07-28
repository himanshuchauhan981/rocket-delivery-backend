import { ApiProperty } from '@nestjs/swagger';

class OrderUser {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  mobile_number?: string;
}

export { OrderUser };
