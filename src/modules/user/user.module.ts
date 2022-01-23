import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CommonService } from '../common/common.service';
import { SubCategoryService } from '../sub-category/sub-category.service';
import { UserController } from './user.controller';
import { UserProvider } from './user.provider';
import { UserService } from './user.service';
import { UserProductModule } from './user-product/user-product.module';
import { ProductService } from '../product/product.service';

@Module({
  imports:[JwtModule.register({ secret: 'eyJhbGciOiJIUzI1NiJ9' }), UserProductModule,],
  controllers: [UserController],
  providers: [UserService, CommonService, SubCategoryService, ProductService, ...UserProvider]
})
export class UserModule {}
