import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { MESSAGES } from 'src/core/constants/messages';

import { CATEGORY_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { Image } from '../file/image.entity';
import { ProductService } from '../product/product.service';
import { SubCategoryService } from '../sub-category/sub-category.service';
import { Category } from './category.entity';
import {
  APIResponse,
  CategoriesListResponse,
  CategoryList,
} from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
    private readonly subCategoryService: SubCategoryService,
    private readonly productService: ProductService,
  ) {}

  async list(payload: CategoryList): Promise<CategoriesListResponse> {
    try {
      const pageIndex = payload.pageIndex * payload.pageSize;

      const categories = await this.categoryRepository.findAndCountAll({
        where: { is_deleted: 0 },
        attributes: ['name', 'is_active', 'id'],
        include: [{ model: Image, attributes: ['id', 'url'] }],
        offset: pageIndex,
        limit: payload.pageSize,
      });

      for (const item of categories.rows) {
        item.subCategoriesCount =
          await this.subCategoryService.countSubCategories(item.id);
        item.productsCount = await this.productService.countProducts(item.id);
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        data: {
          categoriesDetails: categories.rows,
          count: categories.count,
        },
      };
    } catch (err) {
      throw err;
    }
  }

  async findById(id: number) {
    return await this.categoryRepository.findByPk(id);
  }

  async statusUpdate(
    status: number,
    category_id: number,
  ): Promise<APIResponse> {
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
          message: MESSAGES.CATEGORY_NOT_FOUND,
        };
      }
    } catch (err) {
      throw err;
    }
  }

  async delete(categoryIds: number[]): Promise<APIResponse> {
    try {
      console.log(categoryIds);
      const categoryDetails = await this.categoryRepository.findAll({
        where: { id: { [sequelize.Op.in]: categoryIds } },
      });
      console.log('>>>>CategoryDetails', categoryDetails);

      if (categoryDetails.length == categoryIds.length) {
        for (const categoryId of categoryIds) {
          await this.productService.deleteByCategoryId(categoryId);

          await this.subCategoryService.deleteByCategoryId(categoryId);

          await this.categoryRepository.update(
            { is_deleted: 1, is_active: 0 },
            { where: { id: categoryId } },
          );

          return {
            statusCode: STATUS_CODE.SUCCESS,
            message: MESSAGES.PRODUCT_DELETE_SUCCESSFULL,
          };
        }
      } else {
        return {
          statusCode: STATUS_CODE.BAD_REQUEST,
          message: MESSAGES.CATEGORY_NOT_FOUND,
        };
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
