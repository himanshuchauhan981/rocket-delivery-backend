import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { CategoryService } from './category.service';
import { CategoryId, CategoryList, CategoryStatus } from './dto/category.dto';

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

  @Put(':id/status')
  @UseInterceptors(TransformInterceptor)
  async statusUpdate(
    @Param() params: CategoryId,
    @Body(new ValidationPipe()) payload: CategoryStatus,
  ) {
    const data = this.categoryService.statusUpdate(payload.status, params.id);
    return data;
  }
}
