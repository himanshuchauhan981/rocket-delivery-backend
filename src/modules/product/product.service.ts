import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { PRODUCT_REPOSITORY } from 'src/core/constants/repositories';
import { AdminProductList } from '../admin/admin-product/dto/admin-product.dto';
import { File } from '../admin/file/file.entity';
import { Category } from '../category/category.entity';
import { SubCategory } from '../sub-category/sub-category.entity';
import { ProductPrice } from './product-price.entity';
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
    } catch (err) {
      return err;
    }
  }

  async deleteByCategoryId(category_id: number): Promise<void> {
    await this.productRepository.update(
      { is_deleted: 1, is_active: 0 },
      { where: { category_id } },
    );
  }

  async #sortProduct(sort: number): Promise<any[]> {
    let sortBy = [];

    if (sort == 0) {
      sortBy = [['id', 'ASC']];
    } else if (sort == 1) {
      sortBy = [[sequelize.literal('total_ratings'), 'DESC']];
    } else if (sort == 2) {
      sortBy = [[sequelize.literal('total_ratings'), 'ASC']];
    } else if (sort == 3) {
      sortBy = [[sequelize.literal('total_orders'), 'ASC']];
    } else if (sort == 4) {
      sortBy = [[sequelize.literal('total_orders'), 'DESC']];
    }

    return sortBy;
  }

  async getAll(payload: AdminProductList) {
    try {
      const sortBy = this.#sortProduct(payload.sort);

      const pageIndex = payload.pageIndex * payload.pageSize;

      const data = await this.productRepository.findAndCountAll({
        where: payload.search
          ? {
              [sequelize.Op.and]: [
                { is_deleted: 0 },
                {
                  name: {
                    [sequelize.Op.iLike]: `%${payload.search}%`,
                  },
                },
              ],
            }
          : { is_deleted: 0 },
        include: [
          { model: Category, attributes: ['id', 'name'] },
          { model: SubCategory, attributes: ['id', 'name'] },
          {
            model: ProductPrice,
            attributes: [
              'id',
              'actual_price',
              'discount',
              'discount_type',
              'discount_start_date',
              'discount_end_date',
            ],
          },
          { model: File, attributes: ['id', 'url'] },
        ],
        attributes: [
          'id',
          'name',
          'max_quantity',
          [
            sequelize.literal(
              '(SELECT sum(quantity) from order_products where product_id = Product.id)',
            ),
            'total_orders',
          ],
          // [
          //   sequelize.literal(
          //     '(SELECT sum(ratings) from product_review where product_id = Product.id)',
          //   ),
          //   'total_ratings',
          // ],
        ],
      });
      return { data: data };
    } catch (err) {
      throw err;
    }
  }
}
