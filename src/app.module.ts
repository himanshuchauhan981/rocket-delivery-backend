import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { CommonModule } from './modules/common/common.module';
import { CategoryModule } from './modules/category/category.module';
import { FileService } from './modules/file/file.service';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import DatabaseModule from './core/database/database.module';

@Module({
  imports: [
    AdminModule,
    CategoryModule,
    ...DatabaseModule,
    ConfigModule.forRoot(),
    CommonModule,
    SubCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, FileService],
})
export class AppModule {}
