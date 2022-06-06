module.exports = [
  // loaders
  {
    // 资源模块 用于允许 webpack 打包其他类型的模块资源。如字体， 图片等等。
    test: /\.(png|jpg|jpeg|webp)$/g,
    // asset/resource 会发送一个单独的文件， 并导出 一个url; 即 可以打包出一个文件，也可以将文件当模块映入代码
    // asset/inline 导出一个 资源的 data url
    // asset/source 导出资源 的源代码
    // asset 在导出一个资源的data url  和 发送一个文件 之间自动选择。默认是 8 kb 以下打包成 base64,

    type: "asset/resource",

    generator: {
      // 优先级高于 assetModulefilename
      filename: "image/[name][contenthash:5][ext]",
    },

    // 在 tepe 为 asset 时 设置 文件大小
    // parser: {
    //     dataUrlCondition: {
    //         maxSize: 500 * 1024,
    //     },
    // },
  },
];
