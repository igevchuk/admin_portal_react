var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    publicPath: '/'
  },
  watch: true,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }, 
    {
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },
    {
      test: /\.(css|sass|scss)$/,
      use: [{
          loader: "style-loader"
        },
        {
          loader: "css-loader"
        },
        {
          loader: "sass-loader"
        }
      ],
    }]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@layouts": path.resolve(__dirname, "src/layouts/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@containers": path.resolve(__dirname, "src/containers/"),
      "@views": path.resolve(__dirname, "src/views/"),
      "@routes": path.resolve(__dirname, "src/routes/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@jss": path.resolve(__dirname, "src/assets/jss/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
      "@actions": path.resolve(__dirname, "src/actions"),
      "@services": path.resolve(__dirname, "src/services")
    }
  },
  devServer: {
    historyApiFallback: true
  },
  externals: {
    // 'Config': JSON.stringify(process.env.NODE_ENV === 'production' ? require('./config.prod.json') : require('./config.dev.json'))
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ]
};