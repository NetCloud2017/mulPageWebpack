/**
 * @type {import('webpack').Configuration}
 */

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, options) => {
  let { pagePaths } = options;
  const config = {
    plugins: [
      // css 样式文件提取
      new miniCssExtractPlugin({
        // 导出的css 文件名
        filename: "css/[name][fullhash:5].css",
      }),
      ...Object.keys(pagePaths).map(
        (pageTitle) =>
          new htmlWebpackPlugin({
            // inject: "body",
            template: "../index.html",
            filename: `${pageTitle}/index.html`,
            title: pageTitle,
          })
      ),
    ],
  };
  if (env.production) {
    config.plugins.push(new CleanWebpackPlugin());
  }
  return config;
};
