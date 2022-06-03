// mini-css-extract-plugin 基于 webpack 5 构建, 之前用 extract-text-webpack-plugin， 而webpack 4 用 extract-text-webpack-plugin@next
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const cssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    output: {
        publicPath: ''
    },
    mode: 'production',
    devtool: 'inline-source-map',
    plugins: [new miniCssExtractPlugin(), new CleanWebpackPlugin()],
    optimization: {
        minimizer: [
            // 要 运行在 mode  production 模式中
            new cssMinimizerWebpackPlugin(),
            //  添加 js 代码压缩 这个 terser-webpack-plugin 在 production 模式下才会压缩，development模式下不会。
            new TerserPlugin()
        ]
    },
    performance: {
        // 关闭性能提示， 当有 文件打包后的体积过大等问题时，会有 WARNING in webpack performance recommendations: 等提示字样
        //  默认开启， 现在关闭；
        hints: false
    }
};