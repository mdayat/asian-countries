import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { merge } from "webpack-merge";

import common from "./webpack.common.js";

const config = {
  mode: "production",
  devtool: "source-map",
  plugins: [new ForkTsCheckerWebpackPlugin()],
};

export default merge(common, config);
