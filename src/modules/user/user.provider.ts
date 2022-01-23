import {
  CATEGORY_REPOSITORY,
	MEASURING_UNIT_REPOSITORY,
	PRODUCT_PRICE_REPOSITORY,
	PRODUCT_REPOSITORY,
	SUB_CATEGORY_REPOSITORY,
	USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { Category } from '../category/category.entity';
import { MeasuringUnit } from '../measuring-unit/measuring-unit.entity';
import { ProductPrice } from '../product/product-price.entity';
import { Product } from '../product/product.entity';
import { SubCategory } from '../sub-category/sub-category.entity';
import { User } from './user.entity';
  
export const UserProvider = [
  { provide: USER_REPOSITORY, useValue: User },
  { provide: CATEGORY_REPOSITORY, useValue: Category },
  { provide: SUB_CATEGORY_REPOSITORY, useValue: SubCategory },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: PRODUCT_PRICE_REPOSITORY, useValue: ProductPrice },
  { provide: MEASURING_UNIT_REPOSITORY, useValue: MeasuringUnit },
];
  