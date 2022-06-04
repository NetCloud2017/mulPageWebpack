const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const cssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

//  外面定义了环境名这压力也写报 错了注释了就没有问题
// const env = process.env.NODE_ENV;
// env = "production";
const path = require('path');

const fs = require('fs');

let entriesObj = {};

module.exports = async (env, args) => {
    const pageNames = [];
    entriesObj = await new Promise((resolve, reject) => {
        fs.promises
            .readdir('../../pages')

            .then((res) => {
                const entriesFilesPath = res.map((dir) => {
                    const pathStr = `./pages/${dir}/index.js`;
                    pageNames.push(dir);
                    // fs.access(pathStr, function (err) {
                    //     //    文件和目录不存在的情况下；
                    //     if (err.code == "ENOENT") {
                    //         console.log("文件和目录不存在");
                    //     }
                    // });
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

                    obj[key] = entriesFilesPath[index];
                });
                resolve(obj);
            });
    });

    console.log(env, entriesObj, 'env');
    const bundlePath = path.resolve(__dirname, '../../buildMpa');

    const config = {
        devtool: 'inline-source-map',
        mode: env.development ? 'development' : 'production',
        entry: entriesObj,
        output: {

            path: bundlePath,
            filename: '[name]/index[contenthash:5].js',
            // 清理 build;
            // clean: true,
            // 资源模块文件名， 优先级低于 rule 里面的 asset 里面的generator
            assetModuleFilename: 'image/[name][contenthash:5][ext]',
            // 指定插入html 文件引入的资源路径 , 因为这些文件 有时是放在 cdn 上的。
            publicPath: 'http://localhost:8000/'
        },
       
        // 当我们有些资源想用cdn 引入时，可以用 externals;
        externalsType: 'script', // 以 script 的方式 引入 externals 里的 连接；
        externals: {
            // 这个key 要和 在项目代码中引用的一样， 否则报错

            // jquery: 'jQuery' // jQuery 是在浏览器window 上暴露的全局属性；但是这种方式需要自己手动引入 cdn 连接
            // 自动引入 cdn
            // 自动引入 cdn 在打包是会报错。 error  Unable to resolve path to module 'jquery'  import/no-unresolved 需要 配置  import/no-unresolved 这个 eslint 规则；
            jquery: [
                'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
                'jQuery'
            ]
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        env.production
                            ? {
                                loader: miniCssExtractPlugin.loader
                            }
                            : 'style-loader',
                        'css-loader'
                    ]
                },
                {
                    // 资源模块 用于允许 webpack 打包其他类型的模块资源。如字体， 图片等等。
                    test: /\.(png|jpg|jpeg|webp)$/g,
                    // asset/resource 会发送一个单独的文件， 并导出 一个url; 即 可以打包出一个文件，也可以将文件当模块映入代码
                    // asset/inline 导出一个 资源的 data url
                    // asset/source 导出资源 的源代码
                    // asset 在导出一个资源的data url  和 发送一个文件 之间自动选择。默认是 8 kb 以下打包成 base64,

                    type: 'asset/resource',

                    generator: {
                        // 优先级高于 assetModulefilename
                        filename: 'image/[name][contenthash:5][ext]'
                    }

                    // 在 tepe 为 asset 时 设置 文件大小
                    // parser: {
                    //     dataUrlCondition: {
                    //         maxSize: 500 * 1024,
                    //     },
                    // },
                },
                {
                    // 正则 g 模式是惰性的
                    // test: /\.(ttf|woff|svg|eot|woff2)$/g, 导致有些没有匹配到
                    test: /\.(ttf|woff|svg|eot|woff2)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'webfont/[name][contenthash:5][ext]'
                    }
                },

                {
                    test: /\.(htm|html)$/g,
                    use: 'html-loader'
                },
                //  js 文件处理
                {
                    test: /\.js/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            //  处理 js ES 语法 async await(会转译成 regeneratorRuntime 这个方法) 需要 用 @babel/runtime  @babel/plugin-transform-runtime
                            // 这两个包处理
                            plugins: ['@babel/plugin-transform-runtime']
                        }
                    }
                }
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
            ]
        },
        plugins: [
            new miniCssExtractPlugin({
                // 导出的css 文件名
                filename: 'css/[name][fullhash:5].css'
            }),
            // new copyWebpackPlugin({

            // }),
            ...Object.keys(entriesObj).map(
                (pageTitle) => new htmlWebpackPlugin({
                    template: './index.html',
                    filename: `${pageTitle}/index.html`,
                    title: pageTitle
                })
            )
        ],
        optimization: {
            minimizer: [
                // 要 运行在 mode  production 模式中
                new cssMinimizerWebpackPlugin()
            ],
            splitChunks: {
                // chunks: "all",
                cacheGroups: {
                    // 将所有的 三方库打包后缓存 到一个文件里
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        filename: 'venderScript/vendor.[contenthash:5].js'
                    }
                },
                maxSize: 1024 * 100
            }
        },
        performance: {
            // 关闭性能提示， 当有 文件打包后的体积过大等问题时，会有 WARNING in webpack performance recommendations: 等提示字样
            //  默认开启， 现在关闭；
            hints: false
        }

    };

    return config;
};