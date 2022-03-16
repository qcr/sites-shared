const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['qcr-sites-shared'] = path.resolve(__dirname, 'src/');
    config.module.rules.push(
      ...[
        {
          resourceQuery: /raw/,
          type: 'asset/source',
        },
        {
          test: /\.files$/,
          loader: './lib/loaders/files',
        },
      ]
    );
    return config;
  },
};
