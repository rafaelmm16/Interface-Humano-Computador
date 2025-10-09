/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const repo = "Interface-Humano-Computador";

const nextConfig = {
  output: "export",
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;