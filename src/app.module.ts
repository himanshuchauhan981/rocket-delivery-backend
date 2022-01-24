import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { CommonModule } from './modules/common/common.module';
import { CategoryModule } from './modules/category/category.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { AddressModule } from './modules/address/address.module';
import DatabaseModule from './core/database/database.module';

@Module({
  imports: [
    AdminModule,
    CategoryModule,
    ...DatabaseModule,
    ConfigModule.forRoot(),
    CommonModule,
    SubCategoryModule,
    UserModule,
    OrderModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
