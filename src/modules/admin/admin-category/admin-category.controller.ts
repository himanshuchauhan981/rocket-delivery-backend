import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { CategoryService } from 'src/modules/category/category.service';
import {
  APIResponse,
  CategoriesListResponse,
} from 'src/modules/category/dto/category.dto';
import {
  CategoryId,
  CategoryIdList,
  CategoryList,
  CategoryStatus,
} from './dto/admin-category.dto';

@Controller('admin/category')
@ApiTags('Admin Categories')
export class AdminCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('list')
  @UseInterceptors(TransformInterceptor)
  async list(@Query() query: CategoryList): Promise<CategoriesListResponse> {
    return await this.categoryService.list(query);
  }

  @Put(':id/status')
  @UseInterceptors(TransformInterceptor)
  async statusUpdate(
    @Param() params: CategoryId,
    @Body(new ValidationPipe()) payload: CategoryStatus,
  ): Promise<APIResponse> {
    return await this.categoryService.statusUpdate(payload.status, params.id);
  }

  @Delete('bulkDelete')
  @UseInterceptors(TransformInterceptor)
  async delete(
    @Body(new ValidationPipe()) payload: CategoryIdList,
  ): Promise<APIResponse> {
    console.log(payload);
    return await this.categoryService.delete(payload.categoryIds);
  }
}
