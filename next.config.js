const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['qcr-sites-shared'] = path.resolve(__dirname, 'src/');
    return config;
  },
};
