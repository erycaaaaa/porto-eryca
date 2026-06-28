const isGH = process.env.GH_PAGES === 'true'; 

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGH && {
    output: 'export',               
    basePath: '/porto-eryca',      
    assetPrefix: '/porto-eryca/',
    images: { unoptimized: true },   
  }),
  ...(!isGH && {
    async rewrites() {
      return [
        {
          source: '/porto-eryca/:path*',
          destination: '/:path*',
        },
      ];
    },
  }),
};
export default nextConfig;
