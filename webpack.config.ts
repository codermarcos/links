import { join, resolve } from "path";

import { Configuration, ProvidePlugin } from "webpack";

import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

import pkg from "./package.json";
import language from "./values";

const templateParameters = language();

const config: Configuration = {
  mode: "development",
  entry: {},
  output: {
    path: join(__dirname, pkg.config.out),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ejs$/i,
        use: { loader: "ejs-easy-loader" },
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ejs"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, "./src", "static"),
          to: resolve(__dirname, "./dist"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      templateParameters,
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: "./src/sitemap.ejs",
      filename: "sitemap.xml",
      templateParameters,
      inject: false,
    }),
  ],
};

export default config;
