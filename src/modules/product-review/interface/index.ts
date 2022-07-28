import { ApiProperty } from '@nestjs/swagger';

class ReviewImages {
  @ApiProperty()
  id: number;

  @ApiProperty()
  url: string;
}

class ProductReview {
  @ApiProperty()
  id: number;

  @ApiProperty()
  headline: string;

  @ApiProperty()
  opinion: string;

  @ApiProperty()
  ratings: number;

  @ApiProperty()
  product_id: number;

  @ApiProperty()
  review_images: ReviewImages[];
}

class ProductDescriptionReview {
  @ApiProperty()
  id: number;

  @ApiProperty()
  headline: string;

  @ApiProperty()
  opinion: string;

  @ApiProperty()
  created_at: Date;
}

export { ProductReview, ProductDescriptionReview };
