const path = require("path");
const HappyPack = require("happypack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const DllReferencePlugin = require("webpack/lib/DllReferencePlugin");
const progressBarPlugin = require("progress-bar-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const config = require("../config");
const { isProduction } = require("./utils");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpackBaseConfig = {
  entry: path.resolve(__dirname, "../src/index.tsx"),
  output: {
    filename: "[name]_[hash:16].js",
    path: path.resolve(__dirname, "../dist")
  },
  resolve: {
    modules: ["node_modules"],
    alias: {
      "@": path.resolve(__dirname, "../src")
    },
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["happypack/loader?id=typescript"],
        exclude: path.resolve(__dirname, "../node_modules")
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: ["happypack/loader?id=image"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HappyPack({
      id: "image",
      loaders: ["url-loader"],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: "typescript",
      loaders: [
        {
          path: "ts-loader",
          query: { happyPackMode: true }
        }
      ],
      threadPool: happyThreadPool
    }),
    new progressBarPlugin(),
    new htmlWebpackPlugin({
      title: "micro video",
      template: path.resolve(__dirname, "../public/index.html"),
      inject: "body",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
};

if (config.isDll) {
  webpackBaseConfig.plugins.push(
    new DllReferencePlugin({
      manifest: require("../dll/framework.manifest.json")
    })
  );
  webpackBaseConfig.plugins.push(
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, "../dll/framework.dll.js") // 对应的 dll 文件路径
    })
  );
}
if (!isProduction()) {
  webpackBaseConfig.plugins.push(
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `Your application is running here: http://${config.devServer.host}:${config.devServer.port}`
        ]
      },
      clearConsole: true
    })
  );
}
module.exports = webpackBaseConfig;
