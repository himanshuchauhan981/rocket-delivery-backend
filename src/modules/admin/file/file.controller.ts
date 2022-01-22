import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JWTAuthGuard } from 'src/core/guard/jwt.guard';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import {
  CreateFileResponse,
  GetAllFilesResponse,
} from './dto/file-response.dto';
import { CreateFile, FileList } from './dto/file.dto';
import { FileService } from './file.service';

@Controller('admin/file')
@ApiTags('File')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get('')
  @ApiBearerAuth('Authorization')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(TransformInterceptor)
  async getAll(
    @Query(new ValidationPipe()) query: FileList,
  ): Promise<GetAllFilesResponse> {
    return await this.fileService.getAll(query);
  }

  @Post('')
  @ApiBearerAuth('Authorization')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(TransformInterceptor)
  async create(
    @Body(new ValidationPipe()) payload: CreateFile,
  ): Promise<CreateFileResponse> {
    return await this.fileService.create(payload);
  }
}
