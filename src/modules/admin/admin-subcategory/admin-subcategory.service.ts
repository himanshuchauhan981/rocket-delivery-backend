import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { MESSAGES } from 'src/core/constants/messages';

import { SUB_CATEGORY_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { Product } from 'src/modules/product/product.entity';
import { SubCategory } from 'src/modules/sub-category/sub-category.entity';
import { File } from '../file/file.entity';
import { SubCategoryList } from './dto/admin-subcategory.dto';

@Injectable()
export class AdminSubcategoryService {
  constructor(
    @Inject(SUB_CATEGORY_REPOSITORY)
    private readonly subCategoryRepository: typeof SubCategory,
  ) {}

  async findAll() {
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

  async findAllByCategoryId(query: SubCategoryList) {
    try {
      const defaultQuery = { [sequelize.Op.and]: [{ is_deleted: 0 }, { category_id: query.categoryId }] };
      const subCategoryList = await this.subCategoryRepository.findAll({
        where: defaultQuery,
        include: [
          { model: File, attributes: ['id', 'url'] },
          { model: Product, attributes: [] },
        ],
        attributes: [
          'id',
          'name',
          'is_active',
          'updated_at',
          [sequelize.fn('COUNT', sequelize.col('products.id')), 'total_products']
        ],
        group: ['SubCategory.id', 'image.id']
      });

      const count = await this.subCategoryRepository.count({
        where: defaultQuery,
      })


      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data : { subCategoryList: subCategoryList, count }
      }
    }
    catch (err) {
      throw err;
    }
  }
}
