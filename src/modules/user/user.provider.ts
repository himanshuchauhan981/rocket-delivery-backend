import {
  CATEGORY_REPOSITORY,
	USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { Category } from '../category/category.entity';
import { User } from './user.entity';
  
export const UserProvider = [
  { provide: USER_REPOSITORY, useValue: User },
  { provide: CATEGORY_REPOSITORY, useValue: Category },
];
  