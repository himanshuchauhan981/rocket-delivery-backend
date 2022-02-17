import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NewPaymentOrder {
  @ApiProperty()
  @IsNotEmpty()
  amount: number;
}
