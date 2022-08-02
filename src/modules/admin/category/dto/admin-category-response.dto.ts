import { ApiProperty } from '@nestjs/swagger';

import { APIResponse } from 'src/modules/common/dto/common.dto';
import { FileResponse } from '../../file/dto/file-response.dto';

class CategoryDetails {
  @ApiProperty()
  name: string;

  @ApiProperty()
  is_active: number;

  @ApiProperty()
  id: number;

  @ApiProperty()
  image: FileResponse;

  @ApiProperty()
  subCategoriesCount: number;

  @ApiProperty()
  productsCount: number;
}

class CategoryList {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: () => [CategoryDetails] })
  categoriesDetails: CategoryDetails[];
}

class CategoryListResponse extends APIResponse {
  @ApiProperty()
  data: CategoryList;
}

class SpecificCategoryResponse extends APIResponse {
  @ApiProperty()
  data: { category: CategoryDetails };
}

export { CategoryListResponse, SpecificCategoryResponse };
