import { ApiResponse } from 'src/modules/common/interface';
import { ProductDetail } from '.';

interface ProductDetailResponse extends ApiResponse {
  data: {
    product_details: ProductDetail;
  };
}

export { ProductDetailResponse };
