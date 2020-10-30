// webpack.config.js
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

const nodeSassMagicImporter = require('node-sass-magic-importer');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV;
const sourceMap = env === 'development';

const config = {
  entry: path.join(__dirname, 'src', 'main.js'),
  mode: env,
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public', 'js'),
  },
  optimization: {
    splitChunks: {
      // Must be specified for HtmlWebpackPlugin to work correctly.
      // See: https://github.com/jantimon/html-webpack-plugin/issues/882
      chunks: 'all',
    },
  },
  devtool: sourceMap ? 'cheap-module-eval-source-map' : undefined,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap,
            },
          },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              importer: nodeSassMagicImporter(),
              sourceMap,
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};

if (env !== 'development') {
  config.plugins.push(new MiniCssExtractPlugin());

  const sassLoader = config.module.rules.find(({ test }) => test.test('.scss'));
  // Replace the `vue-style-loader` with
  // the MiniCssExtractPlugin loader.
  sassLoader.use[0] = MiniCssExtractPlugin.loader;
}

module.exports = config;