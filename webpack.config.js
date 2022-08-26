// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/index.js",
  output: {
    hashFunction: 'xxhash64',
    filename: 'bundle.[contenthash].js',
    // path: path.resolve(__dirname, '/dist')
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
          { from: path.resolve(__dirname, './static') }
      ]
  }),
  new MiniCssExtractPlugin(),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
       // HTML
       {
        test: /\.(html)$/,
        use:
        [
            'html-loader'
        ]
    },

    // JS
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use:
        [
            'babel-loader'
        ]
    },

    // CSS
    {
        test: /\.css$/,
        use:
        [
            MiniCssExtractPlugin.loader,
            // stylesHandler,
            'css-loader'
        ]
    },

    // Images
    {
      test: /\.(jpg|png|gif|svg)$/,
      type: 'asset/resource',
      generator:
      {
          filename: 'assets/images/[hash][ext]'
      }
    },
    
    // Fonts
    {
      test: /\.(ttf|eot|woff|woff2)$/,
      type: 'asset/resource',
      generator:
      {
          filename: 'assets/fonts/[hash][ext]'
      }
    },

    // Shaders
    {
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
      generator:
      {
          filename: 'assets/images/[hash][ext]'
      }
    },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
