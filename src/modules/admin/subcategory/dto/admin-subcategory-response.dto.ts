import { ApiProperty } from '@nestjs/swagger';

import { APIResponse } from 'src/modules/common/dto/common.dto';

class SubCategory {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  category_id: number;
}

class Image {
  @ApiProperty()
  id: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  name: string;
}

class SpecificSubCategory {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  image: Image;
}

class AdminSubCategoryList {
  @ApiProperty({ type: () => [SubCategory] })
  subCategoryList: SubCategory[];
}

class SpecificSubCategoryData {
  @ApiProperty()
  subCategory: SpecificSubCategory;
}

class AdminSubCategoryListResponse extends APIResponse {
  data: AdminSubCategoryList;
}

class SpecificSubCategoryResponse extends APIResponse {
  data: SpecificSubCategoryData;
}

export { AdminSubCategoryListResponse, SpecificSubCategoryResponse };
