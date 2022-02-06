import { PRODUCT_HISTORY_REPOSITORY } from "src/core/constants/repositories";
import { ProductHistory } from "src/modules/product-history/product-history.entity";

export const ProductHistoryProvider = [
  { provide: PRODUCT_HISTORY_REPOSITORY, useValue: ProductHistory }
];