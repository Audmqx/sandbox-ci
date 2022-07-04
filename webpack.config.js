const webpack = require("webpack");
const path = require("path");

// module.exports = {
//   mode: "production",
//   entry: {
//     app: "./src/index.js"
//   },
//   output: {
//     filename: "[name].bundle.js",
//     path: path.resolve(__dirname, "dist")
//   }
// };

let config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "./bundle.js"
  }
}

module.exports = config;