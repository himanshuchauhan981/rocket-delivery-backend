import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/modules/category/interface';

import { APIResponse } from 'src/modules/common/dto/common.dto';
import { ProductPrice } from 'src/modules/product/interface';
import { SubCategory } from 'src/modules/sub-category/interface';
import { FileResponse } from '../../file/dto/file-response.dto';

class Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  max_quantity: number;

  @ApiProperty()
  total_orders: number;

  @ApiProperty()
  total_ratings?: number;

  @ApiProperty()
  category: Category;

  @ApiProperty()
  subCategory: SubCategory;

  @ApiProperty()
  product_price: ProductPrice;

  @ApiProperty()
  file: FileResponse;
}

class AdminProduct {
  @ApiProperty({ type: () => [Product] })
  productsList: Product[];

  @ApiProperty()
  count: number;
}

class AdminProductListResponse extends APIResponse {
  @ApiProperty()
  data: AdminProduct;
}

export { AdminProductListResponse };
