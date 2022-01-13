import { Inject, Injectable } from '@nestjs/common';
import { SUB_CATEGORY_REPOSITORY } from 'src/core/constants/repositories';
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
      console.log(err);
    }
  }
}
