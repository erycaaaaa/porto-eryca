// next.config.ts
const isProd = process.env.NODE_ENV === "production";
const repo = "porto-eryca";
const base = isProd ? `/${repo}` : "";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },      
  basePath: base,                    
  assetPrefix: base + "/",           
  trailingSlash: true,               
  env: {
    NEXT_PUBLIC_BASE_PATH: base,      
  },
};

export default nextConfig;
