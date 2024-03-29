import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AdminProductList {
  @ApiProperty()
  @IsNotEmpty()
  page: number;

  @ApiProperty()
  @IsNotEmpty()
  limit: number;

  @ApiProperty()
  @IsNotEmpty()
  sort: number;

  @ApiProperty({ required: false })
  search: string;
}

export class NewProduct {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: false })
  ingredients: string;

  @ApiProperty()
  @IsNotEmpty()
  stockVisibility: string;

  @ApiProperty({ required: false })
  benefitsList: string[];

  @ApiProperty({ required: false })
  featuresList: string[];

  @ApiProperty()
  @IsNotEmpty()
  maximumCartQuantity: number;

  @ApiProperty()
  @IsNotEmpty()
  minimumCartQuantity: number;

  @ApiProperty()
  @IsNotEmpty()
  category: number;

  @ApiProperty({ required: false })
  subCategory: number;

  @ApiProperty()
  @IsNotEmpty()
  image: number;

  @ApiProperty()
  @IsNotEmpty()
  measuringUnit: number;

  @ApiProperty()
  @IsNotEmpty()
  paymentMethod: number;

  @ApiProperty()
  @IsNotEmpty()
  productStock: number;

  @ApiProperty()
  @IsNotEmpty()
  unitPrice: number;

  @ApiProperty({ required: false })
  discountPrice: number;

  @ApiProperty({ required: false })
  discountStartDate: Date;

  @ApiProperty({ required: false })
  discountEndDate: Date;

  @ApiProperty({ required: false })
  discountType: string;

  @ApiProperty()
  @IsNotEmpty()
  refundable: boolean;
}

export class SpecificProduct {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}
