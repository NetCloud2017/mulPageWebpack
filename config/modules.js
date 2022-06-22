/**
 * @type {import('webpack').Configuration}
 
*/

const miniCssExtractPlugin = require("mini-css-extract-plugin");
// const env = process.env.NODE_ENV
// console.log(env, 'env');
module.exports = (env) => {
    const config = {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        env.production
                            ? {
                                  loader: miniCssExtractPlugin.loader,
                              }
                            : "style-loader",
                        "css-loader",
                    ],
                },

                // {
                //   test: /\.(htm|html)$/g,
                //   use: "html-loader",
                // },
                //  js 文件处理
                {
                    test: /\.js/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", {
                                useBuildIns: 'entry',
                                targets: {
                                    esmodule: true,
                                    browsers: ['>1%', 'last 2 version']
                                }
                            }],
                            //  处理 js ES 语法 async await(会转译成 regeneratorRuntime 这个方法) 需要 用 @babel/runtime  @babel/plugin-transform-runtime
                            // 这两个包处理
                            plugins: ["@babel/transform-runtime"],
                        },
                    },
                },

                // {
                //     // A loader for webpack that lets you import files as a string.
                //     test: /\.txt$/,
                //     use: "raw-loader",
                // },

                // {
                //     test: /\.(png|jpg|jpeg|webp)$/g,
                //     use: {
                //       // url-loader / file-loader 这些都不要用了，官方建议尽量用 asset 处理资源。
                //         loader: "url-loader",
                //         options: {
                //             name: "[hash:10].[ext]",
                //             limit: 8 * 1024,
                //             // callback: 'file-loader',
                //             // name: '[path][name][hash:5].[ext]'
                //         },
                //     },
                // },
            ],
        },
    };
    return config;
};
