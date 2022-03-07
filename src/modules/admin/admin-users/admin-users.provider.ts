import { CATEGORY_REPOSITORY, USER_REPOSITORY } from "src/core/constants/repositories";
import { Category } from "src/modules/category/category.entity";
import { User } from "src/modules/user/user.entity";

export const AdminUsersProvider = [
  { provide: USER_REPOSITORY, useValue: User },
  { provide: CATEGORY_REPOSITORY, useValue: Category }
];