const path = require("path");

module.exports = {
  mode: "development", // Set mode to 'development' or 'production'
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    library: "NetworkInfo",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "swc-loader",
        exclude: /node_modules/,
        options: {
          jsc: {
            parser: {
              syntax: "ecmascript",
              jsx: true,
            },
            transform: {
              react: {
                runtime: "automatic",
              },
            },
          },
        },
      },
    ],
  },
  externals: {
    react: "react",
  },
};
