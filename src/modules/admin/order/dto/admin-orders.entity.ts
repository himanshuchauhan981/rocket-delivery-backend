import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { ORDER_STATUS } from 'src/core/constants/constants';

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

export class UpdateOrder {
  @ApiProperty({ required: false })
  payment_status: string;

  @ApiProperty({
    required: false,
    enum: [
      ORDER_STATUS.REQUESTED,
      ORDER_STATUS.CONFIRMED,
      ORDER_STATUS.DELIVERED,
      ORDER_STATUS.CANCELLED,
    ],
  })
  status: string;

  @ApiProperty({ required: false })
  delivery_status: string;
}
