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
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { USER_TYPE } from 'src/core/constants/constants';

import { APIResponse } from 'src/modules/common/dto/common.dto';
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
  @Auth(USER_TYPE.ADMIN)
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: APIResponse })
  @ApiConflictResponse({ type: APIResponse })
  create(
    @Body(new ValidationPipe()) payload: SubmitCategory,
  ): Promise<APIResponse> {
    return this.categoryService.create(payload);
  }

  @Get('list')
  @Auth(USER_TYPE.ADMIN)
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: CategoryListResponse, description: 'Category List' })
  list(@Query() query: CategoryList): Promise<CategoryListResponse> {
    return this.categoryService.list(query);
  }

  @Get(':id')
  @Auth(USER_TYPE.ADMIN)
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: SpecificCategoryResponse })
  @ApiNotFoundResponse({
    type: APIResponse,
    description: 'Invalid Category ID',
  })
  categoryDetails(
    @Param() params: CategoryId,
  ): Promise<SpecificCategoryResponse> {
    return this.categoryService.findOneById(params.id);
  }

  @Put(':id')
  @Auth(USER_TYPE.ADMIN)
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
  @Auth(USER_TYPE.ADMIN)
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
  @Auth(USER_TYPE.ADMIN)
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
