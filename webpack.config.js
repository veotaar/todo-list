const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const WebpackPwaManifest = require("webpack-pwa-manifest");
// const WorkboxPlugin = require("workbox-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: "./src/index.js",
  devtool: "inline-source-map",
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 600,
  },
  devServer: {
    static: "./dist",
    open: true,
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    // new WebpackPwaManifest({
    //   name: "Todo List",
    //   short_name: "ToDo",
    //   description: "A to-do list application",
    //   background_color: "#ffffff",
    //   theme_color: "#0f172a",
    //   publicPath: "./",
    //   crossorigin: null, //can be null, use-credentials or anonymous
    //   inject: true,
    //   ios: true,
    //   icons: [
    //     {
    //       src: path.resolve(__dirname, "./src/assets/icon.png"),
    //       sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
    //     },
    //     {
    //       src: path.resolve(__dirname, "./src/assets/icon.png"),
    //       size: "512x512",
    //       purpose: "maskable",
    //     },
    //   ],
    // }),
    // new WorkboxPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|ttf|woff|woff2|png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
