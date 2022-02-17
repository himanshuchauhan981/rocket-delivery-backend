import { SUB_CATEGORY_REPOSITORY } from 'src/core/constants/repositories';
import { SubCategory } from 'src/modules/sub-category/sub-category.entity';

export const AdminSubCategoryProvider = [
  { provide: SUB_CATEGORY_REPOSITORY, useValue: SubCategory },
];
