module.exports = [
  {
    // 正则 g 模式是惰性的
    // test: /\.(ttf|woff|svg|eot|woff2)$/g, 导致有些没有匹配到
    test: /\.(ttf|woff|svg|eot|woff2)$/,
    type: "asset/resource",
    generator: {
      filename: "webfont/[name][contenthash:5][ext]",
    },
  },
];
