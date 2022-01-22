import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JWTAuthGuard } from 'src/core/guard/jwt.guard';
import { AdminSubcategoryService } from './admin-subcategory.service';

@ApiTags('Admin sub category')
@Controller('admin/subcategory')
export class AdminSubcategoryController {
  constructor(private readonly adminSubCategoryService: AdminSubcategoryService) {}

  @Get('all')
  @ApiBearerAuth('Authorization')
  @UseGuards(JWTAuthGuard)
  async findAll() {
    return await this.adminSubCategoryService.findAll(); 
  }
}
