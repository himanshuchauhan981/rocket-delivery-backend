import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { ApiResponse } from 'src/modules/common/interface';

import { MESSAGES } from '../../../core/constants/messages';
import {
  PRODUCT_REPOSITORY,
  SUB_CATEGORY_REPOSITORY,
} from '../../../core/constants/repositories';
import { STATUS_CODE } from '../../../core/constants/status_code';
import { Product } from '../../../modules/product/product.entity';
import { SubCategory } from '../../../modules/sub-category/sub-category.entity';
import { File } from '../file/file.entity';
import {
  SubCategoryList,
  SubmitSubCategory,
} from './dto/admin-subcategory.dto';
import {
  AdminSubCategoryListResponse,
  SpecificSubCategoryResponse,
} from './interface/admin-subcategory';

@Injectable()
export class AdminSubcategoryService {
  constructor(
    @Inject(SUB_CATEGORY_REPOSITORY)
    private readonly subCategoryRepository: typeof SubCategory,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  async findAll(): Promise<AdminSubCategoryListResponse> {
    try {
      const subCategoryList = await this.subCategoryRepository.findAll({
        where: { [sequelize.Op.and]: [{ is_active: 1 }, { is_deleted: 0 }] },
        attributes: ['id', 'name', 'category_id'],
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { subCategoryList },
      };
    } catch (err) {
      throw err;
    }
  }

  async findOneById(id: number): Promise<SpecificSubCategoryResponse> {
    try {
      const subCategory = await this.subCategoryRepository.findByPk(id, {
        include: [{ model: File, attributes: ['id', 'url', 'name'] }],
        attributes: ['id', 'name'],
      });

      if (!subCategory) {
        throw new HttpException(
          MESSAGES.SUB_CATEGORY_NOT_FOUND,
          STATUS_CODE.NOT_FOUND,
        );
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { subCategory },
      };
    } catch (err) {
      throw err;
    }
  }

  async findAllByCategoryId(query: SubCategoryList) {
    try {
      const defaultQuery = {
        [sequelize.Op.and]: [
          { is_deleted: 0 },
          { category_id: query.category_id },
        ],
      };
      const subCategoryList = await this.subCategoryRepository.findAll({
        where: defaultQuery,
        include: [
          { model: File, attributes: ['id', 'url', 'name'] },
          { model: Product, attributes: [] },
        ],
        attributes: [
          'id',
          'name',
          'is_active',
          'updated_at',
          [
            sequelize.fn('COUNT', sequelize.col('products.id')),
            'total_products',
          ],
        ],
        group: ['SubCategory.id', 'image.id'],
      });

      const count = await this.subCategoryRepository.count({
        where: defaultQuery,
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { subCategoryList: subCategoryList, count },
      };
    } catch (err) {
      throw err;
    }
  }

  async update(payload: SubmitSubCategory, id: number) {
    try {
      const subCategoryDetails = await this.subCategoryRepository.findByPk(id);

      if (subCategoryDetails) {
        await this.subCategoryRepository.update(payload, {
          where: { id: id },
        });

        return {
          statusCode: STATUS_CODE.SUCCESS,
          message: MESSAGES.SUB_CATEGORY_UPDATE_SUCCESS,
        };
      } else {
        return {
          statusCode: STATUS_CODE.NOT_FOUND,
          message: MESSAGES.INVALID_SUB_CATEGORY,
        };
      }
    } catch (err) {
      throw err;
    }
  }

  async delete(id: number): Promise<ApiResponse> {
    try {
      const response = await this.subCategoryRepository.update(
        { is_deleted: 1, is_active: 0 },
        { where: { id } },
      );

      if (!response[0]) {
        throw new HttpException(
          MESSAGES.SUB_CATEGORY_NOT_FOUND,
          STATUS_CODE.NOT_FOUND,
        );
      }

      await this.productRepository.update(
        { is_deleted: 1, is_active: 0 },
        { where: { category_id: id } },
      );

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUB_CATEGORY_UPDATE_SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }
}
