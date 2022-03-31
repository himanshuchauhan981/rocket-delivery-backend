import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OrdersList {
  @IsNotEmpty()
  @ApiProperty()
  pageIndex: number;

  @IsNotEmpty()
  @ApiProperty()
  pageSize: number;

  @ApiProperty({ required: false })
  paymentStatus: string;

  @ApiProperty({ required: false })
  startDate: string;

  @ApiProperty({ required: false })
  endDate: string;

  @ApiProperty({ required: false })
  orderNumber: string;
}

export class SpecificProduct {
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}
