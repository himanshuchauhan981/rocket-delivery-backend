import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { AdminSubcategoryService } from './admin-subcategory.service';
import { SubCategoryList } from './dto/admin-subcategory.dto';

@ApiTags('Admin sub category')
@Controller('admin/subcategories')
export class AdminSubcategoryController {
  constructor(
    private readonly adminSubCategoryService: AdminSubcategoryService,
  ) {}

  @Get('all')
  @Auth('admin')
  async findAll() {
    return await this.adminSubCategoryService.findAll();
  }

  @Get('')
  @Auth('admin')
  async findAllByCategoryId(@Query(new ValidationPipe()) query: SubCategoryList) {
    return await this.adminSubCategoryService.findAllByCategoryId(query);
  }
}
