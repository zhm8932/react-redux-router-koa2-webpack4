/**
 * Created by 91608 on 2017/9/17.
 */
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackConfig = require('./webpack.config');
const {ROOT,SRC_PATH,PUBLIC_PATH} = require('./commonPath');
module.exports = merge(webpackConfig,{
	mode: 'production', // development
	module: {
		rules:[
			{
				test:/\.scss$/,
				use:[
					MiniCssExtractPlugin.loader,
					{
						loader:'css-loader',
						options: {
							plugins: [
								require('autoprefixer')({
									browsers: ['last 5 version']
								})
							]
						}
					},
					// 'css-loader',
					'sass-loader'
				],
			},
		]
	},
	optimization:{
		minimize: true,
		minimizer:[
			// 用于优化css文件
			new OptimizeCssAssetsPlugin({
				assetNameRegExp: /\.css$/g,
				cssProcessorOptions: {
					safe: true,
					autoprefixer: { disable: true }, // 这里是个大坑，稍后会提到
					mergeLonghand: false,
					discardComments: {
						removeAll: true // 移除注释
					}
				},
				canPrint: true
			})
		]
	},
	plugins: [
		new BundleAnalyzerPlugin(),
		new UglifyJsPlugin({
			exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
			cache:true,    //默认false 启用文件缓存
			parallel:true,    //默认false 使用多进程并行运行和文件缓存来提高构建速度
			extractComments: false, // 移除注释
			uglifyOptions: {
				warnings: false,	// 传递true以返回压缩机警告result.warnings。使用该值"verbose"可获得更详细的警告
				parse: {},			//默认{} 如果要指定一些其他解析选项，则传递对象。
				compress: {
					warnings:false,	//默认值false: - 删除无法访问的代码或未使用的声明等时显示警告
					drop_console:true,	//默认值: false- 传递true放弃对console.*函数的调用 。
					drop_debugger: true,
				},		//默认{} 传递false以完全跳过压缩 传递对象以指定自定义压缩选项。
				mangle: true, 		// 默认true. 传递false以跳过重整名称，或传递一个对象来指定mangle选项
				output: null,		//默认null 如果要指定其他输出选项，则传递对象。默认值针对最佳压缩进行了优化
				toplevel: false,	//默认false true如果要启用顶级变量和函数名称修改并删除未使用的变量和函数，则设置为
				nameCache: null,	//如果您希望跨多个调用缓存损坏的变量和属性名称，则传递一个空对象{}或以前使用过的nameCache对象minify()。注意：这是一个读/写属性。minify()将读取此对象的名称缓存状态，并在缩小期间更新它，以便用户可以重复使用或外部持久化。
				ie8: false,			//默认false 设置true为支持IE8
				keep_fnames: false, //（默认值:) false- 传递true以防止丢弃或损坏函数名称。对于依赖的代码很有用
				beautify: false,	//默认false
				comments: false,
			}
		}),
		// 若要按需加载 CSS 则请注释掉该行
		// new MiniCssExtractPlugin('css/[name].css'),
		new MiniCssExtractPlugin({
			filename:'css/[name].css',
			chunkFilename: "css/[name].[contenthash:8].css"
		}),
		// new webpack.NoErrorsPlugin(),	//不显示错误插件
		new CleanWebpackPlugin(
			['*.zip','public/js','public/css'],　 //匹配删除的文件
			{
				root: ROOT,       　　　　　　　　　　//根目录
				verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
				dry:      false,        　　　　　　　　　　//启用删除文件
				exclude: ["vendors.js","vendors.manifest.json"] //排除不删除的目录，主要用于避免删除公用的文件
			}
		),
		new CopyWebpackPlugin([
			{
				from: path.join(SRC_PATH,'images'),
				to:path.join(PUBLIC_PATH,'images'),
			},
			{
				from: path.join(SRC_PATH,'api'),
				to:path.join(PUBLIC_PATH,'api'),
			}

		] ),
	],
})