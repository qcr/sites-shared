const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['qcr-sites-shared'] = path.resolve(__dirname, 'src/');
    config.resolve.alias['handlebars'] = 'handlebars/dist/handlebars';
    config.module.rules.push(
      ...[
        {
          resourceQuery: /raw/,
          type: 'asset/source',
        },
        {
          resourceQuery: /full/,
          use: [
            {
              loader: './lib/loaders/markdown',
            },
            {
              loader: './lib/loaders/handlebars',
              options: {
                components: 'demo_assets/custom_components',
                data: 'demo_assets/example.yaml',
              },
            },
          ],
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
          resourceQuery: {not: [/full/]},
          loader: './lib/loaders/markdown',
        },
        {
          test: /\.handlebars$/,
          loader: './lib/loaders/handlebars',
          options: {
            components: 'demo_assets/custom_components',
            data: 'demo_assets/example.yaml',
          },
        },
      ]
    );
    return config;
  },
};
