import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/modules/common/interface';

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { AdminSubcategoryService } from './admin-subcategory.service';
import {
  AdminSubCategoryListResponse,
  SpecificSubCategoryResponse,
} from './dto/admin-subcategory-response.dto';
import {
  SubCategoryId,
  SubCategoryList,
  SubmitSubCategory,
} from './dto/admin-subcategory.dto';

@ApiTags('Admin sub category')
@Controller('admin/subcategories')
export class AdminSubcategoryController {
  constructor(
    private readonly adminSubCategoryService: AdminSubcategoryService,
  ) {}

  @Get('list')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  findAll(): Promise<AdminSubCategoryListResponse> {
    return this.adminSubCategoryService.findAll();
  }

  @Get('')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  findAllByCategoryId(@Query(new ValidationPipe()) query: SubCategoryList) {
    return this.adminSubCategoryService.findAllByCategoryId(query);
  }

  @Get(':id')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  findOneById(
    @Param(new ValidationPipe()) params: SubCategoryId,
  ): Promise<SpecificSubCategoryResponse> {
    return this.adminSubCategoryService.findOneById(params.id);
  }

  @Patch(':id')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  update(
    @Body(new ValidationPipe()) payload: SubmitSubCategory,
    @Param(new ValidationPipe()) params: SubCategoryId,
  ) {
    return this.adminSubCategoryService.update(payload, params.id);
  }

  @Delete(':id')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  delete(
    @Param(new ValidationPipe()) params: SubCategoryId,
  ): Promise<ApiResponse> {
    return this.adminSubCategoryService.delete(params.id);
  }
}
