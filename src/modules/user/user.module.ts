import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CommonService } from '../common/common.service';
import { SubCategoryService } from '../sub-category/sub-category.service';
import { UserController } from './user.controller';
import { UserProvider } from './user.provider';
import { UserService } from './user.service';
import { ProductService } from '../product/product.service';
import { MailService } from 'src/core/utils/mail/mail.service';

@Module({
  imports: [JwtModule.register({ secret: 'eyJhbGciOiJIUzI1NiJ9' })],
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
