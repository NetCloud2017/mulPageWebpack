const fs = require("fs");
const pageNames = [];
module.exports.dirFileInfo = function (dirPath) {
  return new Promise((resolve, reject) => {
    fs.promises
      .readdir(dirPath)
      .then((res) => {
        const entriesFilesPath = res.map((dir) => {
          const pathStr = `${dirPath}/${dir}/index.js`;
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
};
