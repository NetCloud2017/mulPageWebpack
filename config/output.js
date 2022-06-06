/**
 * @type {import('webpack').Configuration}
 */

const path = require("path");
const bundlePath = path.resolve(__dirname, "../../buildMpa");
module.exports = {
  output: {
    path: bundlePath,
    filename: "[name]/index[contenthash:5].js",
    // 清理 build;
    // clean: true,
    // 资源模块文件名， 优先级低于 rule 里面的 asset 里面的generator
    assetModuleFilename: "image/[name][contenthash:5][ext]",
    // 指定插入html 文件引入的资源路径 , 因为这些文件 有时是放在 cdn 上的。
    publicPath: "http://localhost:8000/",
  },
};
