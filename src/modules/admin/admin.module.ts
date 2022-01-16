import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CommonService } from '../common/common.service';
import { AdminController } from './admin.controller';
import { AdminProvider } from './admin.provider';
import { AdminService } from './admin.service';
import { AdminCategoryController } from './admin-category/admin-category.controller';
import { CategoryService } from '../category/category.service';
import { SubCategoryService } from '../sub-category/sub-category.service';
import { ProductService } from '../product/product.service';
import { FileModule } from './file/file.module';
import { AdminProductModule } from './admin-product/admin-product.module';
import { AdminCategoryModule } from './admin-category/admin-category.module';

@Module({
  imports: [
    JwtModule.register({ secret: 'eyJhbGciOiJIUzI1NiJ9' }),
    AdminCategoryModule,
    AdminProductModule,
    FileModule,
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    CommonService,
    CategoryService,
    SubCategoryService,
    ProductService,
    ...AdminProvider,
  ],
})
export class AdminModule {}
