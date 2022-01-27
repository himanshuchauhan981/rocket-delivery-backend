import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

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