/** @type {import('next').NextConfig} */
// const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api2r/:path*',
        destination: 'https://api.btyd.io/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
