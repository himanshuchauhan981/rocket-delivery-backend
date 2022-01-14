import { Inject, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/core/constants/messages';

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
            attributes: ['name', 'is_active', 'id'],
            include: [{ model: Image, attributes: ['id', 'url'] }],
            offset: pageIndex,
            limit: payload.pageSize,
          })
          .then(async (categories) => {
            for (const item of categories.rows) {
              item.subCategoriesCount =
                await this.subCategoryService.countSubCategories(item.id);
              item.productsCount = await this.productService.countProducts(
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
        reject(err);
      }
    });
  }

  async findById(id: number) {
    return await this.categoryRepository.findByPk(id);
  }

  async statusUpdate(status: number, category_id: number) {
    try {
      const categoryDetails = await this.findById(category_id);

      if (categoryDetails) {
        await this.categoryRepository.update(
          { is_active: status },
          { where: { id: category_id } },
        );

        return {
          statusCode: STATUS_CODE.SUCCESS,
          message: MESSAGES.CATEGORY_STATUS_UPDATE_SUCCESS,
        };
      } else {
        return {
          statusCode: STATUS_CODE.BAD_REQUEST,
          message: MESSAGES.INVALID_CATEGORY,
        };
      }
    } catch (err) {
      throw err;
    }
  }
}
