import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { MESSAGES } from 'src/core/constants/messages';

import { SUB_CATEGORY_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { SubCategory } from 'src/modules/sub-category/sub-category.entity';

@Injectable()
export class AdminSubcategoryService {
  constructor(@Inject(SUB_CATEGORY_REPOSITORY) private readonly subCategoryRepository: typeof SubCategory) {}

  async findAll() {
    try{
      const subCategoryList = await this.subCategoryRepository.findAll({
        where:{ [sequelize.Op.and]: [{ is_active: 1 }, { is_deleted: 0 }] },
        attributes: ['id', 'name', 'category_id'],
      });

      return { statusCode: STATUS_CODE.SUCCESS, message: MESSAGES.SUCCESS, data: { subCategoryList } }
    }
    catch(err){
      throw err;
    }
  }
}
