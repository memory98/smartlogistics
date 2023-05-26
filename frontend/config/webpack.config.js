const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = function (env) {
  return {
    mode: 'none',
    entry: path.resolve(`src/index.js`),
    output: {
      path: path.resolve('../backend/src/main/resources'),
      filename: 'assets/js/main.js',
      assetModuleFilename: 'assets/images/[hash][ext]',
    },
    module: {
      rules: [
        {
          test: /\.js$/i,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            configFile: path.resolve('config/babel.config.json'),
          },
        },
        {
          test: /\.(c|sa|sc)ss$/i,
          use: [
            'style-loader',
            // 'css-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: (resourcePath) => !resourcePath.includes('react-datepicker.css'),
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(png|gif|jpe?g|svg|ico|tiff?|bmp)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [new CaseSensitivePathsPlugin()],
    devtool: 'eval-source-map',
    devServer: {
      host: '0.0.0.0',
      port: 9090,
      proxy: {
        '/api': 'http://localhost:8080',
        '/assets/smartlogistics': 'http://localhost:8080',
      },
      liveReload: true,
      compress: true,
      hot: false,
      historyApiFallback: true,
    },
  };
};
