import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { AdminSubcategoryService } from './admin-subcategory.service';

@ApiTags('Admin sub category')
@Controller('admin/subcategory')
export class AdminSubcategoryController {
  constructor(private readonly adminSubCategoryService: AdminSubcategoryService) {}

  @Get('all')
  @Auth('admin')
  async findAll() {
    return await this.adminSubCategoryService.findAll(); 
  }
}
