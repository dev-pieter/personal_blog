require("ignore-styles");

require("@babel/register")(() => ({
  ignore: [/(node_modules)/],
  presets: ["es2015", "react-app", "typescript"],
  extensions: [".js", ".jsx", ".ts", ".tsx"],
}));

require("./index");
