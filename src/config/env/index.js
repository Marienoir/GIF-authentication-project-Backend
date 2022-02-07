import rootPath from 'app-root-path';
import development from './development';
import test from './test';
import logger from '../logger';

const {
  GIF_API_PORT: PORT,
  GIF_API_NODE_ENV: NODE_ENV,
  GIF_API_TOKEN_KEY: ACCESS_TOKEN,
} = process.env;
logger.info(`Running ${NODE_ENV} environment`);
const currentEnv = {
  development,
  test,
}[NODE_ENV || 'development'];

export default {
  ...process.env,
  ...currentEnv,
  rootPath,
  PORT,
  NODE_ENV,
  ACCESS_TOKEN,
};
