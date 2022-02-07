import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './database.config';

import { Admin } from 'src/modules/admin/admin.entity';
import { Product } from 'src/modules/product/product.entity';
import { SubCategory } from 'src/modules/sub-category/sub-category.entity';
import { Category } from 'src/modules/category/category.entity';
import { File } from 'src/modules/admin/file/file.entity';
import { ProductPrice } from 'src/modules/product/product-price.entity';
import { OrderProduct } from 'src/modules/order/order-product.entity';
import { MeasuringUnit } from 'src/modules/measuring-unit/measuring-unit.entity';
import { User } from 'src/modules/user/user.entity';
import { Address } from 'src/modules/address/address.entity';
import { Order } from 'src/modules/order/order.entity';
import { UserPayment } from 'src/modules/payment/user-payment.entity';
import { ProductReview } from 'src/modules/product-review/product-review.entity';
import { ProductReviewFile } from 'src/modules/product-review/product-review-file.entity';
import { Wishlist } from 'src/modules/wishlist/wishlist.entity';

let config;
switch (process.env.NODE_ENV) {
  case 'development':
    config = databaseConfig.development;
    break;
  case 'test':
    config = databaseConfig.test;
    break;
  case 'staging':
    config = databaseConfig.production;
    break;
  default:
    config = databaseConfig.development;
}

const DatabaseModule = [
  SequelizeModule.forRootAsync({
    useFactory: () => ({
      ...config,
      models: [
        Admin,
        Product,
        SubCategory,
        Category,
        File,
        ProductPrice,
        OrderProduct,
        MeasuringUnit,
        User,
        Address,
        Order,
        UserPayment,
        ProductReview,
        ProductReviewFile,
        Wishlist
      ],
    }),
  }),
];

export default DatabaseModule;
