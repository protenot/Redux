const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: {
    main: path.resolve(__dirname, "./src/index.ts"),
  },
  output: {
    filename: "[name].[hash-8].js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      /* {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },*/
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(?:js|mjs|cjs|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      /* {
        test: /\.(?:ico|gif|png|jpeg|jpg|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name]-[hash:5][ext]",
        },
      }, */
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),
  ],

  devServer: {
    compress: false,
    open: true,
    port: 3000,
    hot: true,
  },
};
