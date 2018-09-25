/**
 * Created by 91608 on 2017/9/17.
 */
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
let {ROOT,SRC_PATH,publicPath,PUBLIC_PATH} = require('./commonPath');

// const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

let entry={};
const getEntry = function (files='') {
	let jsPath = path.join(SRC_PATH,'js',files);
	const dirs = fs.readdirSync(jsPath);
	let matchs= null;
	dirs.forEach((item)=>{
		// console.log("item:",item)
		if(item!=='libs'&&item!=='common'){
			if(fs.statSync(jsPath+'/'+item).isDirectory()){
				// console.log("目录222:",jsPath+'/'+item)
				getEntry(files+'/'+ item)
			}else{
				matchs = (files + '/' + item).match(/\/(.+)\.jsx?$/)
				// console.log("matchs:",matchs);
				if(matchs){
					entry[matchs[1]] = path.join(jsPath,item)
				}
			}
		}
	});
	// console.log("entry:",entry);
	return entry
}

module.exports = {
	entry:{
		app:path.join(SRC_PATH,'app.js'),
	},
	output: {
		path: path.join(ROOT,'public'),
		filename: "js/[name].js",
		chunkFilename:'js/[name].[chunkhash:5].js',
		publicPath:publicPath
	},
	// devtool: 'source-map',
	// devtool: 'inline-source-map',
	resolve: {
		extensions: ['.js','.jsx','.json','.scss','.jade','.less'],
		modules: [
		    path.join(SRC_PATH),
		   "node_modules"
		],
		alias:{
			libs:path.join(SRC_PATH,'js/libs'),
			sass:path.join(SRC_PATH,'sass'),
			views:path.join(ROOT,'views'),
			moment:'moment/min/moment-with-locales.min.js',
		}
	},
	module: {
		//略对已知文件的解析,提高打包速度
		noParse: [/moment-with-locales/],
		rules:[
			{
				test:/\.jsx?$/,
				use:'babel-loader',
				exclude:/node_modules/
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/,
				include:/src/,
				use:{
					loader: 'url-loader',
					options: {
						limit:1024*8,
						name: './fonts/[name].[ext]',
					},
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				include:/src/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024*16,  //当图片大小小于限制时会自动转成 base64 码引用
							name:'./images/[name].[ext]',
							prefix: 'img'
						},
					}
				]

			},
			{
				test:/\.pug/,
				use: 'pug-loader',
				exclude:/node_modules/,
				include:/views/
			},
			{
				test: /\.less$/,
				use: [
					{loader: "style-loader"},
					{loader: "css-loader"},
					{
						loader: "postcss-loader",
						options: {
							plugins: [
								require('autoprefixer')({
									browsers: ['last 5 version']
								})
							]
						}
					},
					{
						loader: "less-loader",
						options: {
							javascriptEnabled: true
						}
					}
				],
				// 切记这个地方一定要引入antd，文档上没有写入但是一定要因引进去，切记切记
				include: [/antd/]
			},
			{
				test: /\.css/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader"
				}]
			},
			{
				// test: /\.bundle\.js$/, // 通过文件名后缀自动处理需要转成bundle的文件
				test: /\.js$/, // 通过文件名后缀自动处理需要转成bundle的文件
				include: /pages/,
				exclude: /node_modules/,
				use: [{
					loader: 'bundle-loader',
					options: {
						name: '[name].bundle',
						lazy: true
					}
				}, {
					loader: 'babel-loader',
				}]
			}
		]
	},
	optimization: {
		minimize: false, //默认true production模式
		splitChunks:{
			chunks: "async",  //值为"initial", "async"（默认） 或 "all"  initial 入口chunk，对于异步导入的文件不处理; async 异步chunk，只对异步导入的文件处理;all 全部chunk（我反正选all，不甚理解）
			minSize:30000,  //minSize 最小尺寸必须大于此值，默认30000B
			minChunks: 1,	//他entry引用次数大于此值
			maxAsyncRequests: 5,	//异步请求的chunks不应该超过此值
			maxInitialRequests: 3,	//entry文件请求的chunks不应该超过此值（请求过多，耗时）
			name: false,			//生成文件名
			cacheGroups: {			//自定义配置主要使用它来决定生成的文件
				vendors: {
					name: 'vendors',
					chunks: 'initial',
					priority: -10,
					reuseExistingChunk: false,
					test: /node_modules\/(.*)\.js/
				},
				common: {// ‘src/js’ 下的js文件
					chunks:"all",
					test:/[\\/]src[\\/]js[\\/]/,//也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,
					name: "common", //生成文件名，依据output规则
					minChunks: 2,
					maxInitialRequests: 5,
					minSize: 0,
					priority:1
				}
			}
		}
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(), //启用作用域提升 让代码文件更小、运行的更快
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			'React':'react',
			'ReactDOM':'react-dom',
			moment:'moment'
		}),
		// new webpack.optimize.CommonsChunkPlugin({name:'common',minChunks:3}), //模块必须被3个才会共享
		new webpack.DllReferencePlugin({
			context:__dirname,  //context：需要跟之前保持一致，这个用来指导webpack匹配manifest.json中库的路径
			// manifest:require('../public/vendors.manifest.json') //用来引入刚才输出的manifest.json文件
			manifest:require(path.join(PUBLIC_PATH,'vendors.manifest.json')) //用来引入刚才输出的manifest.json文件
		}),
	]
}