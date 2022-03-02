module.exports = {
  development: {
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    logging: true,
    synchronize: true,
    dialect: 'postgres',
  },
  test: {
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    logging: true,
    synchronize: true,
    dialect: 'postgres',
  },
  staging: {
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    logging: true,
    synchronize: true,
    dialect: 'postgres',
  },
  production: {
    username: process.env.PRODUCTION_TYPEORM_USERNAME,
    password: process.env.PRODUCTION_TYPEORM_PASSWORD,
    database: process.env.PRODUCTION_TYPEORM_DATABASE,
    host: process.env.PRODUCTION_TYPEORM_HOST,
    port: parseInt(process.env.PRODUCTION_TYPEORM_PORT, 10),
    logging: true,
    synchronize: true,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  },
};
