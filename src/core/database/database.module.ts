import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './database.config';

import { Admin } from '../../modules/admin/admin.entity';
import { Product } from '../../modules/product/product.entity';
import { SubCategory } from '../../modules/sub-category/sub-category.entity';
import { Category } from '../../modules/category/category.entity';
import { File } from '../../modules/admin/file/file.entity';
import { ProductPrice } from '../../modules/product/product-price.entity';
import { OrderProduct } from '../../modules/order/order-product.entity';
import { MeasuringUnit } from '../../modules/measuring-unit/measuring-unit.entity';
import { User } from '../../modules/user/user.entity';
import { Address } from '../../modules/address/address.entity';
import { Order } from '../../modules/order/order.entity';
import { UserPayment } from '../../modules/payment/user-payment.entity';
import { ProductReview } from '../../modules/product-review/product-review.entity';
import { ProductReviewFile } from '../../modules/product-review/product-review-file.entity';
import { Wishlist } from '../../modules/wishlist/wishlist.entity';
import { ProductHistory } from '../../modules/product-history/product-history.entity';
import { Notification } from '../../modules/notification/entity/notification.entity';
import { NotificationUser } from '../../modules/notification/entity/notification-user.entity';
import { NotificationTemplate } from '../../modules/notification/entity/notification-template.entity';
import { ProductDescription } from '../../modules/product/product-description.entity';
import { Cities } from 'src/modules/shipping/cities/cities.entity';
import { Countries } from 'src/modules/shipping/countries/countries.entity';
import { States } from 'src/modules/shipping/states/states.entity';

let config;
switch (process.env.NODE_ENV) {
  case 'development':
    config = databaseConfig.development;
    break;
  case 'test':
    config = databaseConfig.test;
    break;
  case 'production':
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
        Wishlist,
        ProductHistory,
        Notification,
        NotificationUser,
        NotificationTemplate,
        ProductDescription,
        Countries,
        States,
        Cities,
      ],
    }),
  }),
];

export default DatabaseModule;
