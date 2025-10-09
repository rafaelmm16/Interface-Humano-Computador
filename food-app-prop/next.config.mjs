/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const repo = "interface-humano-computador";

const nextConfig = {
  output: "export",
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;