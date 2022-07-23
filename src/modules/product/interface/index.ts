import { MeasuringUnit } from 'src/modules/measuring-unit/interface';
import { ProductDescriptionReview } from 'src/modules/product-review/interface';
import { SubCategory } from 'src/modules/sub-category/interface';
import { File } from 'src/modules/admin/file/interface';
import { Category } from 'src/modules/category/interface';

interface ProductPrice {
  actual_price: number;
}

interface ProductDescription {
  id: number;
  benefits: string[];
  ingredients: string;
  features: string[];
  description: string;
}

interface ProductDetail {
  id: number;
  name: string;
  max_quantity: number;
  minimum_cart_quantity: number;
  maximum_cart_quantity: number;
  payment_method: string;
  stock_visibility: string;
  product_price: ProductPrice;
  file: File;
  category: Category;
  subCategory: SubCategory;
  measurementUnit: MeasuringUnit;
  product_description: ProductDescription;
  product_review: ProductDescriptionReview[];
  average_ratings: number;
}

export { ProductDetail, ProductPrice };
