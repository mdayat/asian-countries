import { merge } from "webpack-merge";

import common from "./webpack.common.js";

const config = {
  mode: "production",
  devtool: "source-map",
};

export default merge(common, config);
