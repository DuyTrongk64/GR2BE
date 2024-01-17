import dotenv from 'dotenv';
dotenv.config();

const env = JSON.parse(JSON.stringify(process.env));
const config = {
  env,
};
export default config;
