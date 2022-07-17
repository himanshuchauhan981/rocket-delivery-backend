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
  page: number;

  @IsNotEmpty()
  @ApiProperty()
  limit: number;

  @ApiProperty({ required: false })
  payment_status: string;

  @ApiProperty({ required: false })
  start_date: string;

  @ApiProperty({ required: false })
  end_date: string;

  @ApiProperty({ required: false })
  order_number: string;
}

export class SpecificProduct {
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}

export class UpdateOrder {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(ORDER_PAYMENT_STATUS, { always: false })
  payment_status: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(ORDER_STATUS, { always: false })
  status: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(DELIVERY_STATUS, { always: false })
  delivery_status: string;
}
