import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { CreateFile, FileList, FileListBySlug } from './dto/file.dto';
import { File } from './file.entity';
import {
  CATEGORY_REPOSITORY,
  FILE_REPOSITORY,
  PRODUCT_REPOSITORY,
  SUB_CATEGORY_REPOSITORY,
} from '../../../core/constants/repositories';
import { STATUS_CODE } from '../../../core/constants/status_code';
import { MESSAGES } from '../../../core/constants/messages';
import {
  FILE_FILTER_BY,
  FILE_SLUGS,
  FILE_SORT_BY,
} from '../../../core/constants/constants';
import { Category } from '../../../modules/category/category.entity';
import { SubCategory } from '../../../modules/sub-category/sub-category.entity';
import { Product } from '../../../modules/product/product.entity';
import {
  CreateFileResponse,
  GetAllFilesResponse,
  GetFilesBySlugResponse,
  ImageList,
} from './dto/file-response.dto';
import { APIResponse } from 'src/modules/common/dto/common.dto';

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
      const page = query.page * query.limit;
      const filterBy = parseInt(query.filter_by, 10);
      const sortBy = FILE_SORT_BY[parseInt(query.sort_by, 10)];

      const sqlQuery: any = [{ is_deleted: 0 }];

      if (filterBy) {
        sqlQuery.push({ slug: FILE_FILTER_BY[filterBy] });
      }

      const imageList = await this.fileRepository.findAndCountAll({
        where: { [sequelize.Op.and]: sqlQuery },
        attributes: [
          'id',
          'name',
          'url',
          'created_at',
          'type',
          'extension',
          [sequelize.literal('size / 1000000'), 'size'],
        ],
        order: sortBy ? [[sortBy.field, sortBy.method]] : [['id', 'ASC']],
        offset: page,
        limit: query.limit,
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        data: {
          imageList: imageList.rows as unknown as ImageList[],
          count: imageList.count,
        },
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
        data: { imageList: imageList as unknown as ImageList[] },
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
        extension: payload.extension,
        size: payload.size,
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

  async delete(id: number): Promise<APIResponse> {
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
