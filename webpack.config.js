var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: './src/index.js',
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
      "@images": path.resolve(__dirname, "src/assets/images/")
    }
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ]
};