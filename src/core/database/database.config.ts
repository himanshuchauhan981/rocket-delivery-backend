import * as dotenv from 'dotenv';
import { IDatabaseConfig } from './interfaces/dbConfig.interface';

/**
 *  npx sequelize-cli db:migrate requires a module export and cant
 *  use type IDatabaseConfig.  Load from contig.ts and wrap as IDatabaseConfig
 */
dotenv.config();

const { development, test, production } = require('./config');

export const databaseConfig: IDatabaseConfig = {
  development: development,
  test: test,
  production: production,
};
