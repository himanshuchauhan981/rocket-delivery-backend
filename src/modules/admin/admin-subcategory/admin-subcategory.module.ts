import { Module } from '@nestjs/common';
import { AdminSubcategoryController } from './admin-subcategory.controller';
import { AdminSubCategoryProvider } from './admin-subcategory.provider';
import { AdminSubcategoryService } from './admin-subcategory.service';

@Module({
  controllers: [AdminSubcategoryController],
  providers: [AdminSubcategoryService, ...AdminSubCategoryProvider]
})
export class AdminSubcategoryModule {}
