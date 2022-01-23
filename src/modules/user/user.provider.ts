import {
	USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { User } from './user.entity';
  
export const UserProvider = [
  { provide: USER_REPOSITORY, useValue: User },
];
  