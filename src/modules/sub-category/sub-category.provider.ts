import { SUB_CATEGORY_REPOSITORY } from '../../core/constants/repositories';
import { SubCategory } from './sub-category.entity';

export const SubCategoryProvider = [
  { provide: SUB_CATEGORY_REPOSITORY, useValue: SubCategory },
];
