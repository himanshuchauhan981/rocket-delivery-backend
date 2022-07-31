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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import {
  CreateFile,
  FileList,
  FileListBySlug,
  SpecificFile,
} from './dto/file.dto';
import { FileService } from './file.service';
import {
  CreateFileResponse,
  GetAllFilesResponse,
  GetFilesBySlugResponse,
} from './dto/file-response.dto';

@Controller('admin/file')
@ApiTags('File')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get('list')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  getAll(
    @Query(new ValidationPipe()) query: FileList,
  ): Promise<GetAllFilesResponse> {
    return this.fileService.getAll(query);
  }

  @Get('')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  getBySlug(
    @Query(new ValidationPipe()) query: FileListBySlug,
  ): Promise<GetFilesBySlugResponse> {
    return this.fileService.getBySlug(query);
  }

  @Post('')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: CreateFileResponse })
  create(
    @Body(new ValidationPipe()) payload: CreateFile,
  ): Promise<CreateFileResponse> {
    return this.fileService.create(payload);
  }

  @Delete(':id')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  delete(@Param(new ValidationPipe()) params: SpecificFile) {
    return this.fileService.delete(params.id);
  }
}
