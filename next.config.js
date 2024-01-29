/** @type {import('next').NextConfig} */
// const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api2r/:path*',
        destination: 'http://api.btyd.io:8080/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
