import { ApiProperty } from '@nestjs/swagger';

import { MeasuringUnit } from 'src/modules/measuring-unit/interface';
import { ProductDescriptionReview } from 'src/modules/product-review/interface';
import { SubCategory } from 'src/modules/sub-category/interface';
import { Category } from 'src/modules/category/interface';
import { FileResponse } from 'src/modules/admin/file/dto/file-response.dto';

class ProductPrice {
  @ApiProperty()
  actual_price: number;
}

class ProductDescription {
  @ApiProperty()
  id: number;

  @ApiProperty()
  benefits: string[];

  @ApiProperty()
  ingredients: string;

  @ApiProperty()
  features: string[];

  @ApiProperty()
  description: string;
}

class ProductDetail {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  max_quantity: number;

  @ApiProperty()
  minimum_cart_quantity: number;

  @ApiProperty()
  maximum_cart_quantity: number;

  @ApiProperty()
  payment_method: string;

  @ApiProperty()
  stock_visibility: string;

  @ApiProperty()
  product_price: ProductPrice;

  @ApiProperty()
  file: FileResponse;

  @ApiProperty()
  category: Category;

  @ApiProperty()
  subCategory: SubCategory;

  @ApiProperty()
  measurementUnit: MeasuringUnit;

  @ApiProperty()
  product_description: ProductDescription;

  @ApiProperty({ type: () => [ProductDescriptionReview] })
  product_review: ProductDescriptionReview[];

  @ApiProperty()
  average_ratings: number;
}

export { ProductDetail, ProductPrice };
