import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from 'src/modules/admin/admin.entity';
import { databaseConfig } from './database.config';

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
      models: [Admin],
    }),
  }),
];

export default DatabaseModule;
