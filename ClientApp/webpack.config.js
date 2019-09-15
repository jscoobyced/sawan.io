const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GitRevisionWebpackPlugin = require('git-revision-webpack-plugin');

const gitRevisionWebpackPlugin = new GitRevisionWebpackPlugin();
const root = path.join(__dirname, '../sawan/');
const dist = path.join(root, 'wwwroot');

module.exports = (env, argv) => {
  const config = {
    entry: {
      'vendor': ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux'],
      'main': './src/index.tsx'
    },
    output: {
      pathinfo: false,
      path: dist,
      publicPath: '/',
      filename: '[name].[chunkhash].js'
    },
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            test: 'vendor',
            enforce: true
          },
        }
      }
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
      rules: [{
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.scss$/,
          use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              output: 'fonts/'
            }
          }
        },
        {
          test: /\.(gif|png|jpe?g|svg|ico)$/i,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'VERSION': JSON.stringify(gitRevisionWebpackPlugin.version()),
          'mode': JSON.stringify(argv.mode)
        }
      }),
      new CopyWebpackPlugin([{
        from: './src/assets',
        to: dist
      }, ]),
      new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css',
      }),
      new WebpackMd5Hash()
    ]
  }

  if(argv.mode === 'development') {
    config.devtool = 'source-map';
    config.devServer = {
      contentBase: dist,
      compress: true,
      historyApiFallback: true,
      port: 9000,
      disableHostCheck: true,
      host: "0.0.0.0"
    };
    config.plugins.push(
      new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: './src/index.tpl.html',
        filename: 'index.html'
      })
    );
  }

  if(argv.mode === 'production') {
    config.plugins.push(
      new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: './src/Index.tpl.cshtml',
        filename: '../Views/Home/Index.cshtml'
      })
    );
  }

  return config;
};