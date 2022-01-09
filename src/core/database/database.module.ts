import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from 'src/modules/admin/admin.entity';

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
      models: [Admin],
    }),
  }),
];

export default DatabaseModule;
