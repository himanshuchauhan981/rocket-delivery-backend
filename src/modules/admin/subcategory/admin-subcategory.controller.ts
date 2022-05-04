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

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { ApiResponse } from '../dto/interface/admin';
import { AdminSubcategoryService } from './admin-subcategory.service';
import {
  SubCategoryId,
  SubCategoryList,
  SubmitSubCategory,
} from './dto/admin-subcategory.dto';
import {
  AdminSubCategoryListResponse,
  SpecificSubCategoryResponse,
} from './dto/interface/admin-subcategory';

@ApiTags('Admin sub category')
@Controller('admin/subcategories')
export class AdminSubcategoryController {
  constructor(
    private readonly adminSubCategoryService: AdminSubcategoryService,
  ) {}

  @Get('all')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async findAll(): Promise<AdminSubCategoryListResponse> {
    return await this.adminSubCategoryService.findAll();
  }

  @Get('')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async findAllByCategoryId(
    @Query(new ValidationPipe()) query: SubCategoryList,
  ) {
    return await this.adminSubCategoryService.findAllByCategoryId(query);
  }

  @Get(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async findOneById(
    @Param(new ValidationPipe()) params: SubCategoryId,
  ): Promise<SpecificSubCategoryResponse> {
    return await this.adminSubCategoryService.findOneById(params.id);
  }

  @Patch(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async update(
    @Body(new ValidationPipe()) payload: SubmitSubCategory,
    @Param(new ValidationPipe()) params: SubCategoryId,
  ) {
    return await this.adminSubCategoryService.update(payload, params.id);
  }

  @Delete(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async delete(
    @Param(new ValidationPipe()) params: SubCategoryId,
  ): Promise<ApiResponse> {
    return await this.adminSubCategoryService.delete(params.id);
  }
}
