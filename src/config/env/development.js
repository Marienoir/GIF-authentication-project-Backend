import 'dotenv/config';

export default {
  DATABASE_URL: process.env.DEV_DATABASE_URL,
  NODE_ENV: process.env.GIF_API_NODE_ENV,
  ACCESS_TOKEN: process.env.GIF_API_TOKEN_KEY,
};
