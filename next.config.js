/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Add devServer configuration
    config.devServer = {
      ...config.devServer,
      historyApiFallback: true,
    };

    return config;
  },
};

module.exports = nextConfig;
