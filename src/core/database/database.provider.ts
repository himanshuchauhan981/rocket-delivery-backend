import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const defaultConnection = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get('TYPEORM_HOST'),
  port: config.get('TYPEORM_PORT'),
  username: config.get('TYPEORM_USERNAME'),
  password: config.get('TYPEORM_PASSWORD'),
  database: config.get('TYPEORM_DATABASE'),
  logging: true,
});

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: defaultConnection,
    inject: [ConfigService],
  }),
];
