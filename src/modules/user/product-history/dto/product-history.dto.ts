import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NewProductHistory {
  @ApiProperty()
  @IsNotEmpty()
  product_id: number;
}

export class SpecificProductHistory {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}
