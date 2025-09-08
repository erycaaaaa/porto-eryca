// next.config.js
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export', 
  basePath: isProd ? '/porto-eryca' : '',
  assetPrefix: isProd ? '/porto-eryca/' : '',
  images: { unoptimized: true },
  trailingSlash: true, 
};
