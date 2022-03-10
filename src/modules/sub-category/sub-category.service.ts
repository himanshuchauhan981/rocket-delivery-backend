import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { MESSAGES } from 'src/core/constants/messages';
import { SUB_CATEGORY_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { File } from '../admin/file/file.entity';
import { Category } from '../category/category.entity';
import { SubCategory } from './sub-category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @Inject(SUB_CATEGORY_REPOSITORY)
    private readonly subCategoryRepository: typeof SubCategory,
  ) {}

  async countSubCategories(category_id: number): Promise<number> {
    try {
      const subCategories = await this.subCategoryRepository.findAndCountAll({
        where: { category_id },
      });

      return subCategories.count;
    } catch (err) {
      throw err;
    }
  }

  async deleteByCategoryId(category_id: number[]): Promise<void> {
    await this.subCategoryRepository.update(
      { is_deleted: 1, is_active: 0 },
      { where: { category_id } },
    );
  }

  async list(category_id: number) {
    try {
      const subCategories = await this.subCategoryRepository.findAll({
        where: {
          [sequelize.Op.and]: [
            { category_id },
            { is_active: 1 },
            { is_deleted: 0 },
          ],
        },
        include: [
          { model: Category, attributes: ['id', 'name'] },
          { model: File, attributes: ['url', 'id'] },
        ],
        attributes: ['id', 'name'],
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { subCategories },
      };
    } catch (err) {
      throw err;
    }
  }
}
