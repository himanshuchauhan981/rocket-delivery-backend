import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { CreateFile, FileList } from './dto/file.dto';
import { File } from './file.entity';
import {
  CreateFileResponse,
  GetAllFilesResponse,
} from './dto/file-response.dto';
import { FILE_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { MESSAGES } from 'src/core/constants/messages';
import { ApiResponse } from 'src/modules/admin/dto/interface/admin';

@Injectable()
export class FileService {
  constructor(
    @Inject(FILE_REPOSITORY) private readonly fileRepository: typeof File,
  ) {}

  async getAll(query: FileList): Promise<GetAllFilesResponse> {
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
      await this.fileRepository.destroy({
        where: { id },
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.FILE_DELETED_SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }
}
