/**
 * @type {import('webpack').Configuration}
 */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { merge } = require("webpack-merge");
//  外面定义了环境名这压力也写报 错了注释了就没有问题
// const env = process.env.NODE_ENV;
// env = "production";
const path = require("path");

const commonConfig = require("./common");
const prodConfig = require("./prod");
const devConfig = require("./dev");
console.log('hello world');
module.exports = async (env, args) => {
  const config = {
    plugins: [],
    resolve: {
      // 别名
      alias: {
        "@": path.join(__dirname, "../src"),
        // 导入的模块 省去拓展名时， 若查找的模块在形同位置有同名时
      },
      // webpack 会会获取 extensions 里最前的拓展名的文件。

    //   extensions: [".json", ".js", ".vue"],
    },

    devServer: {
      // contentBase 在 webpack 5 中去除了。
      hot: true,
      // 设置 static,让 localhost 的根目录是 项目的根目录。
      static: "buildMpa",
      port: 8000,
      compress: true,
      open: true,
      // headers: {key : 'value'}, // 添加响应头
      // 开启代理
      proxy: {
        api: "http:localhost:8000",
        pathRewrite: { "^/api": "" },
      },
      // https: true, //  开启HTTPS 本地访问， 但是 需要配置证书，也可以使用 http2 这个配置 它默认采用了 默认自带的证书；
      // http2: true,
      // 具体配合
      // https: {
      //     cacert: "./server.pem",
      //     pfx: "./server.pfx",
      //     key: "./server.key",
      //     cert: "./serverrcrt",
      //     passphrase: "webpack-dev-server",
      //     requestCert: true,
      // },
    },
  };
  if (env.production) {
    config.plugins.push(new CleanWebpackPlugin());
  }

  return merge(config, commonConfig, env.production ? prodConfig : devConfig);
};
