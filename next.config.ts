const isGH = process.env.GH_PAGES === 'true'; 

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGH && {
    output: 'export',               
    basePath: '/porto-eryca',      
    assetPrefix: '/porto-eryca/',
    images: { unoptimized: true },   
  }),
};
export default nextConfig;
