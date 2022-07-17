import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NewReviewFiles {
  @ApiProperty()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsNotEmpty()
  type: string;
}

export class NewProductReview {
  @ApiProperty()
  @IsNotEmpty()
  headline: string;

  @ApiProperty()
  @IsNotEmpty()
  opinion: string;

  @ApiProperty()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty()
  @IsNotEmpty()
  ratings: number;

  @ApiProperty()
  @IsNotEmpty()
  order_product_id: number;

  @ApiProperty()
  @IsNotEmpty()
  review_images: NewReviewFiles[];
}

export class UpdateProductReview {
  @ApiProperty()
  @IsNotEmpty()
  headline: string;

  @ApiProperty()
  @IsNotEmpty()
  opinion: string;

  @ApiProperty()
  @IsNotEmpty()
  ratings: number;

  @ApiProperty()
  @IsNotEmpty()
  remove_image_id: number[];

  @ApiProperty()
  @IsNotEmpty()
  review_images: NewReviewFiles[];
}

export class SpecificProductReview {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}

export class ProductReviewList {
  @ApiProperty()
  @IsNotEmpty()
  page: number;

  @ApiProperty()
  @IsNotEmpty()
  limit: number;

  @ApiProperty()
  @IsNotEmpty()
  product_id: number;
}
