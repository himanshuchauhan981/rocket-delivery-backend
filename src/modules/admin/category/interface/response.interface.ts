import { ApiResponse } from '../../interface/admin';

interface CategoriesDetails {
  name: string;
  is_active: number;
  id: number;
  image: { id: number; url: string };
  subCategoriesCount: number;
  productsCount: number;
}

interface CategoriesListData {
  count: number;
  categoriesDetails: CategoriesDetails[];
}

interface SpecificCategoryResponse extends ApiResponse {
  data: {
    category: CategoriesDetails;
  };
}

interface CategoriesListResponse extends ApiResponse {
  data: CategoriesListData;
}

export { SpecificCategoryResponse, CategoriesListResponse };
