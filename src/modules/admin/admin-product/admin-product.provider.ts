import { PRODUCT_REPOSITORY } from 'src/core/constants/repositories';
import { Product } from 'src/modules/product/product.entity';

export const AdminProductProvider = [
  { provide: PRODUCT_REPOSITORY, useValue: Product },
];
