import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { CategoryService } from './category.service';
import { CategoryList } from './dto/category.dto';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('list')
  @UseInterceptors(TransformInterceptor)
  async list(@Query() query: CategoryList) {
    const data = this.categoryService.list(query);
    return data;
  }
}
