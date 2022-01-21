import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AdminSubcategoryService } from './admin-subcategory.service';

@ApiTags('Admin sub category')
@Controller('admin/subcategory')
export class AdminSubcategoryController {
  constructor(private readonly adminSubCategoryService: AdminSubcategoryService) {}

  @Get('all')
  async findAll() {
    return await this.adminSubCategoryService.findAll(); 
  }
}
