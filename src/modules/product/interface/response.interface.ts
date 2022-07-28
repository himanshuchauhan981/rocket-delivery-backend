import { ApiProperty } from '@nestjs/swagger';

import { APIResponse } from 'src/modules/common/dto/common.dto';
import { ProductDetail } from '.';

class ProductDetails {
  @ApiProperty()
  product_details: ProductDetail;
}

class ProductDetailResponse extends APIResponse {
  @ApiProperty()
  data: ProductDetails;
}

export { ProductDetailResponse };
