import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { MESSAGES } from 'src/core/constants/messages';
import { CATEGORY_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { Category } from 'src/modules/category/category.entity';
import { ProductService } from 'src/modules/product/product.service';
import { SubCategoryService } from 'src/modules/sub-category/sub-category.service';
import { ApiResponse } from '../dto/interface/admin';
import { File } from '../file/file.entity';
import { CategoryList, SubmitCategory } from './dto/admin-category.dto';
import {
  CategoriesListResponse,
  SpecificCategoryResponse,
} from './dto/interface/response.interface';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
    private readonly subCategoryService: SubCategoryService,
    private readonly productService: ProductService,
  ) {}

  async create(payload: SubmitCategory): Promise<ApiResponse> {
    try {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: payload.name },
      });

      if (existingCategory) {
        throw new HttpException(
          MESSAGES.CATEGORY_ADD_SUCCESS,
          STATUS_CODE.SUCCESS,
        );
      }

      await this.categoryRepository.create<any>({
        name: payload.name,
        image_id: payload.image_id,
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.CATEGORY_EXISTED,
      };
    } catch (err) {
      throw err;
    }
  }

  async list(payload: CategoryList): Promise<CategoriesListResponse> {
    try {
      const pageIndex = payload.pageIndex * payload.pageSize;

      const categories = await this.categoryRepository.findAndCountAll({
        where: { is_deleted: 0 },
        attributes: ['name', 'is_active', 'id', 'updated_at'],
        include: [{ model: File, attributes: ['id', 'url'] }],
        order: [[payload.sortColumn, payload.sortBy]],
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
        message: MESSAGES.SUCCESS,
        data: {
          categoriesDetails: categories.rows,
          count: categories.count,
        },
      };
    } catch (err) {
      throw err;
    }
  }

  async findOneById(categoryId: number): Promise<SpecificCategoryResponse> {
    try {
      const category = await this.categoryRepository.findByPk(categoryId, {
        include: [{ model: File, attributes: ['id', 'name', 'url'] }],
        attributes: ['id', 'name'],
      });

      if (!category) {
        throw new HttpException(
          MESSAGES.CATEGORY_NOT_FOUND,
          STATUS_CODE.NOT_FOUND,
        );
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        data: { category },
        message: MESSAGES.SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }

  async update(
    payload: SubmitCategory,
    categoryId: number,
  ): Promise<ApiResponse> {
    try {
      const categoryDetails = await this.categoryRepository.findByPk(
        categoryId,
      );

      if (!categoryDetails) {
        throw new HttpException(
          MESSAGES.CATEGORY_NOT_FOUND,
          STATUS_CODE.NOT_FOUND,
        );
      }

      await this.categoryRepository.update(payload, {
        where: { id: categoryId },
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.CATEGORY_UPDATE_SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }

  async statusUpdate(
    status: number,
    category_id: number,
  ): Promise<ApiResponse> {
    try {
      const response = await this.categoryRepository.update(
        { is_active: status },
        { where: { id: category_id } },
      );

      if (!response[0]) {
        throw new HttpException(
          MESSAGES.CATEGORY_NOT_FOUND,
          STATUS_CODE.BAD_REQUEST,
        );
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.CATEGORY_STATUS_UPDATE_SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }

  async delete(categoryIdList: number[]): Promise<ApiResponse> {
    try {
      const categoryDetails = await this.categoryRepository.findAll({
        where: { id: { [sequelize.Op.in]: categoryIdList } },
      });

      if (categoryDetails.length !== categoryIdList.length) {
        return {
          statusCode: STATUS_CODE.BAD_REQUEST,
          message: MESSAGES.CATEGORY_NOT_FOUND,
        };
      }

      await this.productService.deleteByCategoryId(categoryIdList);

      await this.subCategoryService.deleteByCategoryId(categoryIdList);

      await this.categoryRepository.update(
        { is_deleted: 1, is_active: 0 },
        { where: { id: categoryIdList } },
      );

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.CATEGORY_DELETED_SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }
}
