interface ApiResponse {
  statusCode: number;
  message: string;
}

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

interface AdminLoginResponse extends ApiResponse {
  data: {
    token: string;
  };
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

export {
  ApiResponse,
  AdminLoginResponse,
  AdminSubCategoryListResponse,
  SpecificSubCategoryResponse,
};
