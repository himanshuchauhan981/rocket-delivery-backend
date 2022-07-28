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
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { APIResponse } from 'src/modules/common/dto/common.dto';
import { ApiResponse } from 'src/modules/common/interface';

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { CategoryService } from './category.service';
import {
  CategoryListResponse,
  SpecificCategoryResponse,
} from './dto/admin-category-response.dto';
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
  create(
    @Body(new ValidationPipe()) payload: SubmitCategory,
  ): Promise<ApiResponse> {
    return this.categoryService.create(payload);
  }

  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: CategoryListResponse, description: 'Category List' })
  list(@Query() query: CategoryList): Promise<CategoryListResponse> {
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
  @ApiOkResponse({ type: APIResponse, description: 'Update Category Details' })
  @ApiNotFoundResponse({
    type: APIResponse,
    description: 'Invalid category ID',
  })
  update(
    @Body(new ValidationPipe()) payload: SubmitCategory,
    @Param(new ValidationPipe()) params: CategoryId,
  ): Promise<APIResponse> {
    return this.categoryService.update(payload, params.id);
  }

  @Put(':id/status')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: APIResponse, description: 'Update category status' })
  @ApiNotFoundResponse({
    type: APIResponse,
    description: 'Invalid category ID',
  })
  statusUpdate(
    @Param() params: CategoryId,
    @Body(new ValidationPipe()) payload: CategoryStatus,
  ): Promise<APIResponse> {
    return this.categoryService.statusUpdate(payload.status, params.id);
  }

  @Delete('bulkDelete')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({
    type: APIResponse,
    description: 'Category deleted successfully',
  })
  @ApiNotFoundResponse({
    type: APIResponse,
    description: 'Invalid category ID',
  })
  delete(
    @Body(new ValidationPipe()) payload: CategoryIdList,
  ): Promise<APIResponse> {
    return this.categoryService.delete(payload.category_ids);
  }
}
