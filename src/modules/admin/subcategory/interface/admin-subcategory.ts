import { ApiResponse } from 'src/modules/common/interface';

interface SubCategory {
  id: number;
  name: string;
  category_id: number;
}

interface Image {
  id: number;
  url: string;
  name: string;
}

interface SpecificSubCategory {
  id: number;
  name: string;
  image: Image;
}

interface AdminSubCategoryListResponse extends ApiResponse {
  data: {
    subCategoryList: SubCategory[];
  };
}

interface SpecificSubCategoryResponse extends ApiResponse {
  data: {
    subCategory: SpecificSubCategory;
  };
}

export { AdminSubCategoryListResponse, SpecificSubCategoryResponse };
