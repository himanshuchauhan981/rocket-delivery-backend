import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import {
  CreateFileResponse,
  GetAllFilesResponse,
  GetFilesBySlugResponse,
} from './dto/file-response.dto';
import {
  CreateFile,
  FileList,
  FileListBySlug,
  SpecificFile,
} from './dto/file.dto';
import { FileService } from './file.service';

@Controller('admin/file')
@ApiTags('File')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get('all')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async getAll(
    @Query(new ValidationPipe()) query: FileList,
  ): Promise<GetAllFilesResponse> {
    return await this.fileService.getAll(query);
  }

  @Get('')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async getBySlug(
    @Query(new ValidationPipe()) query: FileListBySlug,
  ): Promise<GetFilesBySlugResponse> {
    return await this.fileService.getBySlug(query);
  }

  @Post('')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async create(
    @Body(new ValidationPipe()) payload: CreateFile,
  ): Promise<CreateFileResponse> {
    return await this.fileService.create(payload);
  }

  @Delete(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async delete(@Param(new ValidationPipe()) params: SpecificFile) {
    return await this.fileService.delete(params.id);
  }
}
