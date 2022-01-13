import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/core/constants/repositories';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  async countProducts(category_id: number): Promise<number> {
    try {
      const products = await this.productRepository.findAndCountAll({
        where: { category_id },
      });

      return products.count;
    } catch (Err) {
      console.log('', Err);
    }
  }
}
