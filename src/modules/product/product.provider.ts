import {
  PRODUCT_PRICE_REPOSITORY,
  PRODUCT_REPOSITORY,
} from 'src/core/constants/repositories';
import { ProductPrice } from './product-price.entity';
import { Product } from './product.entity';

export const ProductProvider = [
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: PRODUCT_PRICE_REPOSITORY, useValue: ProductPrice },
];
