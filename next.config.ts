const isProd = process.env.NODE_ENV === "production";
const repo = "porto-eryca";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },  
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  dirs: ['src'],
};
export default nextConfig;
