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
        {
          test: /\.ya?ml$/,
          loader: './lib/loaders/yaml',
        },
        {
          test: /\.mdx?$/,
          loader: './lib/loaders/markdown',
        },
        {
          test: /\.handlebars$/,
          loader: './lib/loaders/handlebars',
          options: {
            components: 'demo_assets/custom_components',
            data: 'demo_assets/example.yaml',
            helpers: 'lib/loaders/handlebars-helpers',
          },
        },
      ]
    );
    return config;
  },
};
