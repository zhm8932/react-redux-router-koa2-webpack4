/**
 * Created by haiming.zeng on 2017/9/18.
 */
const path = require('path');
const ROOT = path.resolve(__dirname,'..');
const SRC_PATH = path.join(ROOT,'src');
const PUBLIC_PATH = path.join(ROOT,'public');
const PORT = process.env.PORT||'4016'
// const publicPath = `http://localhost:${PORT}/`;
const publicPath = `/`;

module.exports = {
	ROOT		:path.resolve(__dirname,'..'),           //根目录
	SRC_PATH	:path.join(ROOT,'src'),       //前端代码
	PUBLIC_PATH	:path.join(ROOT,'public'),    //静态资源
	publicPath	:`/`,
	PORT 		:PORT           //端口
}