import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { CategoryModule } from './modules/category/category.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { AddressModule } from './modules/address/address.module';
import { PaymentModule } from './modules/payment/payment.module';
import DatabaseModule from './core/database/database.module';
import { CommonService } from './modules/common/common.service';
import { ProductReviewModule } from './modules/product-review/product-review.module';
import { ProductHistoryModule } from './modules/product-history/product-history.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { MailModule } from './core/utils/mail/mail.module';
import { SocketsModule } from './core/sockets/sockets.module';
import { NotificationModule } from './modules/notification/entity/notification.module';

@Module({
  imports: [
    JwtModule.register({ secret: 'eyJhbGciOiJIUzI1NiJ9' }),
    AdminModule,
    CategoryModule,
    ...DatabaseModule,
    ConfigModule.forRoot(),
    SubCategoryModule,
    UserModule,
    OrderModule,
    AddressModule,
    PaymentModule,
    ProductReviewModule,
    ProductHistoryModule,
    WishlistModule,
    MailModule,
    SocketsModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, CommonService],
})
export class AppModule {}
