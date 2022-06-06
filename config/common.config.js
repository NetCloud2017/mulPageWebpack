/**
 * @type {import('webpack').Configuration}
 */

//  外面定义了环境名这压力也写报 错了注释了就没有问题
// const env = process.env.NODE_ENV;
// env = "production";
const devServer = require("./devServer");
const modules = require("./modules");
const optimization = require("./optimization");
const output = require("./output");
const plugins = require("./plugins");
module.exports = (env, { entriesObj }) => {
  const config = {
    devtool: "inline-source-map",

    mode: env.production ? "production" : "development",
    ...modules(env),
    ...plugins(env, { pagePaths: entriesObj }),
    ...output,
    ...optimization,
    ...devServer,

    // 当我们有些资源想用cdn 引入时，可以用 externals;
    externalsType: "script", // 以 script 的方式 引入 externals 里的 连接；
    externals: {
      // 这个key 要和 在项目代码中引用的一样， 否则报错
      // jquery: 'jQuery' // jQuery 是在浏览器window 上暴露的全局属性；但是这种方式需要自己手动引入 cdn 连接
      // 自动引入 cdn
      // 自动引入 cdn 在打包是会报错。 error  Unable to resolve path to module 'jquery'  import/no-unresolved 需要 配置  import/no-unresolved 这个 eslint 规则；
      jquery: [
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
        "jQuery",
      ],
    },
  };

  return config;
};
