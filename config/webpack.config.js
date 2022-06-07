/**
 * @type {import('webpack').Configuration}
 */

const { merge } = require("webpack-merge");
//  外面定义了环境名这压力也写报 错了注释了就没有问题

const path = require("path");
const commonConfig = require("./common.config");
const  {dirFileInfo} = require("./nodeUtils")
let entriesObj = {};
module.exports = async (env, args) => {
  entriesObj = await dirFileInfo('./src/pages')
  console.log(entriesObj);
  const config = {
    entry:  entriesObj,
    resolve: {
      // 别名 
      alias: {
        "@": path.join(__dirname, "../src"),
        // 导入的模块 省去拓展名时， 若查找的模块在形同位置有同名时
      },
      // webpack 会会获取 extensions 里最前的拓展名的文件。
      //   extensions: [".json", ".js", ".vue"],
    },
  };

  return merge(config, commonConfig(env, { entriesObj }));
};
