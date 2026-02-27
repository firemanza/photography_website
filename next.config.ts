import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = process.env.NEXT_PUBLIC_REPO_NAME || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd && repoName ? `/${repoName}` : "",
  assetPrefix: isProd && repoName ? `/${repoName}/` : "",
  images: {
    loader: "custom",
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  transpilePackages: ["next-image-export-optimizer"],
  env: {
    nextImageExportOptimizer_imageFolderPath: "public/images",
    nextImageExportOptimizer_exportFolderPath: "out",
    nextImageExportOptimizer_quality: "80",
    nextImageExportOptimizer_storePicturesInWEBP: "true",
    nextImageExportOptimizer_generateAndUseBlurImages: "true",
  },
};

export default nextConfig;
