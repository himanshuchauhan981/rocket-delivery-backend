import { SequelizeModule } from '@nestjs/sequelize';

import { Admin } from 'src/modules/admin/admin.entity';
import { Category } from 'src/modules/category/category.entity';
import { Image } from 'src/modules/file/image.entity';
import { Product } from 'src/modules/product/product.entity';
import { SubCategory } from 'src/modules/sub-category/sub-category.entity';

const DatabaseModule = [
  SequelizeModule.forRootAsync({
    useFactory: () => ({
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      dialect: 'postgres',
      logging: true,
      synchronize: true,
      models: [Admin, Category, Image, SubCategory, Product],
    }),
  }),
];

export default DatabaseModule;
