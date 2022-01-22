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
  SpecificCategoryResponse,
} from 'src/modules/category/dto/category-response.dto';
import {
  CategoryId,
  CategoryIdList,
  CategoryList,
  CategoryStatus,
  UpdateCategory,
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

  @Get(':id')
  @UseInterceptors(TransformInterceptor)
  async categoryDetails(
    @Param() params: CategoryId,
  ): Promise<SpecificCategoryResponse> {
    return await this.categoryService.findOneById(params.id);
  }

  @Put(':id')
  @UseInterceptors(TransformInterceptor)
  async update(
    @Body(new ValidationPipe()) payload: UpdateCategory,
    @Param(new ValidationPipe()) params: CategoryId,
  ) {
    return await this.categoryService.update(payload, params.id);
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
    return await this.categoryService.delete(payload.categoryIds);
  }
}
