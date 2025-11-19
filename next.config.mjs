/** @type {import('next').NextConfig} */
import { config } from './configs/app.js'

const nextConfig = {
  reactStrictMode: true,
  ...(!config.isProduction && {
    basePath: '/app',
    assetPrefix: '/app',
  }),
};

console.log('Run on -> ', process.env.NODE_ENV, ' : ', nextConfig);

export default nextConfig;
