import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { CreateFile, FileList, FileListBySlug } from './dto/file.dto';
import { File } from './file.entity';
import {
  CreateFileResponse,
  GetAllFilesResponse,
  GetFilesBySlugResponse,
} from './dto/file-response.dto';
import {
  CATEGORY_REPOSITORY,
  FILE_REPOSITORY,
  PRODUCT_REPOSITORY,
  SUB_CATEGORY_REPOSITORY,
} from '../../../core/constants/repositories';
import { STATUS_CODE } from '../../../core/constants/status_code';
import { MESSAGES } from '../../../core/constants/messages';
import { ApiResponse } from '../../../modules/admin/dto/interface/admin';
import { FILE_SLUGS } from '../../../core/constants/constants';
import { Category } from '../../../modules/category/category.entity';
import { SubCategory } from '../../../modules/sub-category/sub-category.entity';
import { Product } from '../../../modules/product/product.entity';

@Injectable()
export class FileService {
  constructor(
    @Inject(FILE_REPOSITORY) private readonly fileRepository: typeof File,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
    @Inject(SUB_CATEGORY_REPOSITORY)
    private readonly subCategoryRepository: typeof SubCategory,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  async getAll(query: FileList): Promise<GetAllFilesResponse> {
    try {
      const offset = query.pageIndex * query.pageSize;

      const imageList = await this.fileRepository.findAndCountAll({
        where: { is_deleted: 0 },
        attributes: ['id', 'name', 'url', 'created_at', 'type', 'extension'],
        offset: offset,
        limit: query.pageSize,
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        data: { imageList: imageList.rows, count: imageList.count },
        message: MESSAGES.SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }

  async getBySlug(query: FileListBySlug): Promise<GetFilesBySlugResponse> {
    try {
      const defaultQuery: any = [{ slug: query.slug }];

      if (query.name) {
        defaultQuery.push({
          name: { [sequelize.Op.iLike]: `%${query.name}%` },
        });
      }
      const imageList = await this.fileRepository.findAll({
        where: { [sequelize.Op.and]: defaultQuery },
        attributes: ['id', 'name', 'url'],
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        data: { imageList },
        message: MESSAGES.SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }

  async create(payload: CreateFile): Promise<CreateFileResponse> {
    try {
      const newImage = await this.fileRepository.create<any>({
        url: payload.url,
        name: payload.name,
        type: payload.type,
        slug: payload.slug,
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        data: { id: newImage.id, name: payload.name },
        message: MESSAGES.SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }

  async delete(id: number): Promise<ApiResponse> {
    try {
      const [, [file]] = await this.fileRepository.update(
        { is_deleted: 1 },
        { where: { id }, returning: true },
      );

      if (!file) {
        throw new HttpException(
          MESSAGES.INVALID_FILE_ID,
          STATUS_CODE.NOT_FOUND,
        );
      }

      switch (file.slug) {
        case FILE_SLUGS.CATEGORY:
          await this.categoryRepository.update(
            { image_id: null },
            { where: { image_id: file.id } },
          );
          break;

        case FILE_SLUGS.SUB_CATEGORY:
          await this.subCategoryRepository.update(
            { image_id: null },
            { where: { image_id: file.id } },
          );
          break;

        case FILE_SLUGS.PRODUCT:
          await this.productRepository.update(
            { image_id: null },
            { where: { image_id: file.id } },
          );
          break;

        default:
          break;
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.FILE_DELETED_SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }
}
