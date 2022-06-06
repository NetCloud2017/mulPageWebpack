/**
 * @type {import('webpack').Configuration}
 */

const { merge } = require("webpack-merge");
//  外面定义了环境名这压力也写报 错了注释了就没有问题

const path = require("path");
const fs = require("fs");
const commonConfig = require("./common.config");

let entriesObj = {};
const pageNames = [];
module.exports = async (env, args) => {
  entriesObj = await new Promise((resolve, reject) => {
    fs.promises
      .readdir("./src/pages")

      .then((res) => {
        const entriesFilesPath = res.map((dir) => {
          const pathStr = `./src/pages/${dir}/index.js`;
          pageNames.push(dir);

          return pathStr;
        });

        const obj = {};
        pageNames.forEach((key, index) => {
          // 利用 入口文件的 dependOn 来 收集公共代码
          // obj[key] = {
          //     import: entriesFilesPath[index],
          //     dependOn: "shared",
          // };
          // // 抽离公共代码， 并且以 shared 来命名这个shared.bundle.js
          // obj['shared'] = 'lodash';

          // {
          //     home: {
          //         import: "./pages/home/index.js",
          //         dependOn: "shared",
          //     },
          //     shared: "lodash",
          //     plaform: {
          //         import: "./pages/plaform/index.js",
          //         dependOn: "shared",
          //     },
          // }
          // obj[key] =  entriesFilesPath[index]
          obj[key] = {
            import: entriesFilesPath[index],
            filename: `${key}/js/[contenthash:5].js`, 
          };
        });
        resolve(obj);
      });
  });
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
