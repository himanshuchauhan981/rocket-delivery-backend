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
import { ApiResponse } from 'src/modules/common/interface';

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { CategoryService } from './category.service';
import {
  CategoryId,
  CategoryIdList,
  CategoryList,
  CategoryStatus,
  SubmitCategory,
} from './dto/admin-category.dto';
import {
  CategoriesListResponse,
  SpecificCategoryResponse,
} from './interface/response.interface';

@Controller('admin/category')
@ApiTags('Admin Categories')
export class AdminCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  create(
    @Body(new ValidationPipe()) payload: SubmitCategory,
  ): Promise<ApiResponse> {
    return this.categoryService.create(payload);
  }

  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  list(@Query() query: CategoryList): Promise<CategoriesListResponse> {
    return this.categoryService.list(query);
  }

  @Get(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  categoryDetails(
    @Param() params: CategoryId,
  ): Promise<SpecificCategoryResponse> {
    return this.categoryService.findOneById(params.id);
  }

  @Put(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  update(
    @Body(new ValidationPipe()) payload: SubmitCategory,
    @Param(new ValidationPipe()) params: CategoryId,
  ): Promise<ApiResponse> {
    return this.categoryService.update(payload, params.id);
  }

  @Put(':id/status')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  statusUpdate(
    @Param() params: CategoryId,
    @Body(new ValidationPipe()) payload: CategoryStatus,
  ): Promise<ApiResponse> {
    return this.categoryService.statusUpdate(payload.status, params.id);
  }

  @Delete('bulkDelete')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  delete(
    @Body(new ValidationPipe()) payload: CategoryIdList,
  ): Promise<ApiResponse> {
    return this.categoryService.delete(payload.category_ids);
  }
}
