import { merge } from "webpack-merge";
import common from "./webpack.common.js";

const config = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 3000,
    hot: true,
    static: "./dist",
  },
};

export default merge(common, config);
