import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CommonService } from '../common/common.service';
import { SubCategoryService } from '../sub-category/sub-category.service';
import { UserController } from './user.controller';
import { UserProvider } from './user.provider';
import { UserService } from './user.service';
import { ProductService } from '../product/product.service';
import { MailService } from 'src/core/utils/mail/mail.service';
import { UserAddressModule } from './address/address.module';
import { UserOrderModule } from './order/order.module';
import { UserPaymentModule } from './payment/payment.module';
import { UserProductModule } from './product/product.module';
import { UserProductHistoryModule } from './product-history/product-history.module';
import { UserProductReviewModule } from './product-review/product-review.module';
import { UserWishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [
    JwtModule.register({ secret: 'eyJhbGciOiJIUzI1NiJ9' }),
    UserAddressModule,
    UserOrderModule,
    UserPaymentModule,
    UserProductModule,
    UserProductHistoryModule,
    UserProductReviewModule,
    UserWishlistModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    CommonService,
    SubCategoryService,
    ProductService,
    MailService,
    ...UserProvider,
  ],
})
export class UserModule {}
