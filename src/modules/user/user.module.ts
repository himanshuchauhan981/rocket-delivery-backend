import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CommonService } from '../common/common.service';
import { SubCategoryService } from '../sub-category/sub-category.service';
import { UserController } from './user.controller';
import { UserProvider } from './user.provider';
import { UserService } from './user.service';
import { UserProductModule } from './user-product/user-product.module';
import { ProductService } from '../product/product.service';
import { UserAddressModule } from './user-address/user-address.module';
import { UserOrderModule } from './user-order/user-order.module';
import { UserPaymentModule } from './user-payment/user-payment.module';
import { UserProductReviewModule } from './user-product-review/user-product-review.module';
import { UserProductHistoryModule } from './user-product-history/user-product-history.module';

@Module({
  imports:[
    JwtModule.register({ secret: 'eyJhbGciOiJIUzI1NiJ9' }),
    UserProductModule,
    UserAddressModule,
    UserOrderModule,
    UserPaymentModule,
    UserProductReviewModule,
    UserProductHistoryModule
  ],
  controllers: [UserController],
  providers: [UserService, CommonService, SubCategoryService, ProductService, ...UserProvider]
})
export class UserModule {}
