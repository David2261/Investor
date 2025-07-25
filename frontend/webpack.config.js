const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.tsx', // Главная точка входа (измените, если у вас другой файл)
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'inline-source-map', // Для удобной отладки
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Папка с index.html
    },
    compress: true,
    port: 3000,
    hot: true, // Включает HMR
    historyApiFallback: true, // Для React Router
    open: true, // Автоматически открывает браузер
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'], // Поддержка расширений файлов
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel'), // React Refresh
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: {
          loader: 'source-map-loader',
        },
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin(), // HMR
    isDevelopment && new ReactRefreshWebpackPlugin(), // React Refresh
  ].filter(Boolean),
};