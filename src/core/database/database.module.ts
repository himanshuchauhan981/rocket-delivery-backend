import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './database.config';

import { Admin } from 'src/modules/admin/admin.entity';
import { Product } from 'src/modules/product/product.entity';
import { SubCategory } from 'src/modules/sub-category/sub-category.entity';
import { Category } from 'src/modules/category/category.entity';
import { File } from 'src/modules/admin/file/file.entity';
import { ProductPrice } from 'src/modules/product/product-price.entity';
import { OrderProduct } from 'src/modules/order/order-product.entity';

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
      ],
    }),
  }),
];

export default DatabaseModule;
