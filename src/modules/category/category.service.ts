import { Inject, Injectable } from '@nestjs/common';

import { CATEGORY_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { Image } from '../file/image.entity';
import { ProductService } from '../product/product.service';
import { SubCategoryService } from '../sub-category/sub-category.service';
import { Category } from './category.entity';
import { CategoryList } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
    private readonly subCategoryService: SubCategoryService,
    private readonly productService: ProductService,
  ) {}

  async list(payload: CategoryList) {
    return new Promise((resolve, reject) => {
      try {
        const pageIndex = payload.pageIndex * payload.pageSize;

        this.categoryRepository
          .findAndCountAll({
            where: { is_deleted: 0 },
            include: [{ model: Image, attributes: ['id', 'url'] }],
            offset: pageIndex,
            limit: payload.pageSize,
          })
          .then(async (categories) => {
            for (const item of categories.rows) {
              item.totalSubCategories =
                await this.subCategoryService.countSubCategories(item.id);
              item.totalProducts = await this.productService.countProducts(
                item.id,
              );
            }

            resolve({
              response: STATUS_CODE.SUCCESS,
              data: {
                categoriesDetails: categories.rows,
                count: categories.count,
              },
            });
          });
      } catch (err) {
        console.log('>>>>err', err);
        reject(err);
      }
    });
  }
}
