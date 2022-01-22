import { CATEGORY_REPOSITORY, MEASURING_UNIT_REPOSITORY, PRODUCT_PRICE_REPOSITORY, PRODUCT_REPOSITORY, SUB_CATEGORY_REPOSITORY } from 'src/core/constants/repositories';
import { Category } from 'src/modules/category/category.entity';
import { MeasuringUnit } from 'src/modules/measuring-unit/measuring-unit.entity';
import { ProductPrice } from 'src/modules/product/product-price.entity';
import { Product } from 'src/modules/product/product.entity';
import { SubCategory } from 'src/modules/sub-category/sub-category.entity';

export const AdminProductProvider = [
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: CATEGORY_REPOSITORY, useValue: Category },
  { provide: SUB_CATEGORY_REPOSITORY, useValue: SubCategory },
  { provide: PRODUCT_PRICE_REPOSITORY, useValue: ProductPrice },
  { provide: MEASURING_UNIT_REPOSITORY, useValue: MeasuringUnit }
];
