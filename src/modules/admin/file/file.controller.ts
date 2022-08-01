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
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

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
import { USER_TYPE } from 'src/core/constants/constants';
import { APIResponse } from 'src/modules/common/dto/common.dto';

@Controller('admin/file')
@ApiTags('File')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get('list')
  @Auth(USER_TYPE.ADMIN)
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: GetAllFilesResponse })
  getAll(
    @Query(new ValidationPipe()) query: FileList,
  ): Promise<GetAllFilesResponse> {
    return this.fileService.getAll(query);
  }

  @Get('')
  @Auth(USER_TYPE.ADMIN)
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: GetFilesBySlugResponse })
  getBySlug(
    @Query(new ValidationPipe()) query: FileListBySlug,
  ): Promise<GetFilesBySlugResponse> {
    return this.fileService.getBySlug(query);
  }

  @Post('')
  @Auth(USER_TYPE.ADMIN)
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: CreateFileResponse })
  create(
    @Body(new ValidationPipe()) payload: CreateFile,
  ): Promise<CreateFileResponse> {
    return this.fileService.create(payload);
  }

  @Delete(':id')
  @Auth(USER_TYPE.ADMIN)
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({
    type: APIResponse,
    description: 'File deleted successfully',
  })
  @ApiNotFoundResponse({ type: APIResponse, description: 'Invalid File ID' })
  delete(
    @Param(new ValidationPipe()) params: SpecificFile,
  ): Promise<APIResponse> {
    return this.fileService.delete(params.id);
  }
}
