import {
  CATEGORY_REPOSITORY,
	SUB_CATEGORY_REPOSITORY,
	USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { Category } from '../category/category.entity';
import { SubCategory } from '../sub-category/sub-category.entity';
import { User } from './user.entity';
  
export const UserProvider = [
  { provide: USER_REPOSITORY, useValue: User },
  { provide: CATEGORY_REPOSITORY, useValue: Category },
  { provide: SUB_CATEGORY_REPOSITORY, useValue: SubCategory },
];
  