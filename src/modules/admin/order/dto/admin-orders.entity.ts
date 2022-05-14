import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

import {
  DELIVERY_STATUS,
  ORDER_PAYMENT_STATUS,
  ORDER_STATUS,
} from '../../../../core/constants/constants';

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
  @IsEnum(ORDER_PAYMENT_STATUS, { always: false })
  payment_status: string;

  @ApiProperty({ required: false })
  @IsEnum(ORDER_STATUS, { always: false })
  status: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(DELIVERY_STATUS, { always: false })
  delivery_status: string;
}
