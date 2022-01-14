import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CategoryList {
  @IsNotEmpty()
  @ApiProperty()
  pageIndex: number;

  @IsNotEmpty()
  @ApiProperty()
  pageSize: number;
}

class CategoriesDetails {
  name: string;
  is_active: number;
  id: number;
  image: { id: number; url: string };
  subCategoriesCount: number;
  productsCount: number;
}

class CategoriesListData {
  count: number;
  categoriesDetails: CategoriesDetails[];
}

export class CategoriesListResponse {
  statusCode: number;
  data: CategoriesListData;
}

export class APIResponse {
  statusCode: number;
  message: string;
}
