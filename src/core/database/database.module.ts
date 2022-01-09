import { SequelizeModule } from '@nestjs/sequelize';

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
      models: [],
    }),
  }),
];

export default DatabaseModule;
