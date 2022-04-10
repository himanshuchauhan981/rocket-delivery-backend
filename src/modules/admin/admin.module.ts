import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CommonService } from '../common/common.service';
import { AdminController } from './admin.controller';
import { AdminProvider } from './admin.provider';
import { AdminService } from './admin.service';
import { CategoryService } from './category/category.service';
import { SubCategoryService } from '../sub-category/sub-category.service';
import { ProductService } from '../product/product.service';
import { FileModule } from './file/file.module';
import { AdminProductModule } from './product/product.module';
import { AdminCategoryModule } from './category/category.module';
import { AdminSubcategoryModule } from './subcategory/admin-subcategory.module';
import { MeasuringUnitModule } from '../measuring-unit/measuring-unit.module';
import { AdminOrdersModule } from './order/order.module';
import { AddressService } from '../address/address.service';
import { AdminUsersModule } from './users/users.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    JwtModule.register({ secret: 'eyJhbGciOiJIUzI1NiJ9' }),
    AdminCategoryModule,
    AdminProductModule,
    FileModule,
    AdminSubcategoryModule,
    MeasuringUnitModule,
    AdminOrdersModule,
    AdminUsersModule,
    NotificationModule,
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    CommonService,
    CategoryService,
    SubCategoryService,
    ProductService,
    AddressService,
    ...AdminProvider,
  ],
})
export class AdminModule {}
