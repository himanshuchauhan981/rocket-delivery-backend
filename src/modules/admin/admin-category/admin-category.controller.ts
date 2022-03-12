import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { CategoryService } from 'src/modules/category/category.service';
import {
  APIResponse,
  CategoriesListResponse,
  SpecificCategoryResponse,
} from 'src/modules/category/dto/category-response.dto';
import { ApiResponse } from '../dto/interface/admin';
import {
  CategoryId,
  CategoryIdList,
  CategoryList,
  CategoryStatus,
  SubmitCategory,
} from './dto/admin-category.dto';

@Controller('admin/category')
@ApiTags('Admin Categories')
export class AdminCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async create(
    @Body(new ValidationPipe()) payload: SubmitCategory,
  ): Promise<ApiResponse> {
    return await this.categoryService.create(payload);
  }

  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async list(@Query() query: CategoryList): Promise<CategoriesListResponse> {
    return await this.categoryService.list(query);
  }

  @Get(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async categoryDetails(
    @Param() params: CategoryId,
  ): Promise<SpecificCategoryResponse> {
    return await this.categoryService.findOneById(params.id);
  }

  @Put(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async update(
    @Body(new ValidationPipe()) payload: SubmitCategory,
    @Param(new ValidationPipe()) params: CategoryId,
  ): Promise<ApiResponse> {
    return await this.categoryService.update(payload, params.id);
  }

  @Put(':id/status')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async statusUpdate(
    @Param() params: CategoryId,
    @Body(new ValidationPipe()) payload: CategoryStatus,
  ): Promise<APIResponse> {
    return await this.categoryService.statusUpdate(payload.status, params.id);
  }

  @Delete('bulkDelete')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async delete(
    @Body(new ValidationPipe()) payload: CategoryIdList,
  ): Promise<APIResponse> {
    return await this.categoryService.delete(payload.categoryIds);
  }
}
