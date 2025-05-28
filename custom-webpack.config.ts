import { EnvironmentPlugin } from 'webpack';
import { config } from 'dotenv';

config({ path: `.env.${process.env['NODE_ENV'] || 'development'}` }); // Load env file based on NODE_ENV or default to .env.development

module.exports = {
  plugins: [
    new EnvironmentPlugin(Object.keys(process.env)),
  ],
};