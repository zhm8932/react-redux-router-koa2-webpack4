const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body')
const favicon = require('koa-favicon');
const path = require('path')

const utils = require('./server/utils');
const index = require('./server/routes/index')
const users = require('./server/routes/users')
const rule = require('./server/routes/rule')
const charts = require('./server/routes/charts')

const logUtil = require('./server/utils/logger');
const proxy = require('./server/utils/proxy');
const logger = logUtil.getLogger('log');
const logErrors = logUtil.getLogger('errors');
const logAccess = logUtil.getLogger('access');

global.logger = logger;     	//日志
global.proxys = proxy;       	//封装HTTP请求


// middlewares
//koaBody必须放在bodyparser前面
app.use(koaBody({
	multipart: true,
	strict: false, //默认为true，不解析GET,HEAD,DELETE请求
	formidable:{
		// uploadDir: path.join(__dirname, 'public/upload'),
		keepExtensions:true,
		maxFileSize: 500*1024*1024    // 设置上传文件大小最大限制，默认2M
	}
}))

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(json());

// app.use(logger())
console.log("__dirname:",__dirname)
app.use(require('koa-static')(__dirname + '/public'))
app.use(favicon(__dirname + '/public/images/favicon.ico'))

app.use(views(__dirname + '/server' +'/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next()
  const ms = new Date() - start;
  // logAccess.info(`${ctx.method} ${ctx.url} - ${ms} --access `);
  logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
})

app.use(async(ctx, next) =>{
	//模板引擎配置全局的变量
	ctx.state.keywords = 'React-koa2首页';
	ctx.state.description = 'React-koa2首页描述';
	await next()
})

app.use(async function (ctx, next) {
	// 获取客户端请求接受类型
	let acceptedType = ctx.accepts('html', 'text', 'json');
	console.log("originalUrl:", ctx.originalUrl,"acceptedType:", acceptedType);
	await next()
})

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(rule.routes(), rule.allowedMethods());
app.use(charts.routes(), charts.allowedMethods());

app.use(async (ctx, next)=>{
	console.log("ctx::::::::::::",JSON.stringify(ctx))
	//处理xhr请求
	if (utils.isAjax(ctx.request)) {
		console.log("AJAX请求！！！")
		// let error = utils.handlerError(null,ctx);
		ctx.throw(404, 'Not Found!!!');
		await next();
	}else{
		console.log("渲染首页模板")
		await ctx.render('app', {
			title: 'Koa2-React'
		})
	}
})


app.use(async (ctx, next) => {
	try {
		console.log("handler:",ctx)
		await next();
	} catch (err) {
		console.log("handler-err:",err)
		ctx.response.status = err.statusCode || err.status || 500;
		ctx.response.body = {
			message: err.message||'系统错误！！！'
		};
		// 手动释放error事件
		ctx.app.emit('error', err, ctx);
	}
});

// error-handling
app.on('error',async (err, ctx) => {
	let error = utils.handlerError(err,ctx);
	logErrors.error('server err:',JSON.stringify(error),'ctx:',ctx);
	logErrors.error('ctx.request:',ctx.request);
	logErrors.error('ctx.response:',ctx.response);
	ctx.response.status = err.statusCode || err.status || 500;
	// ctx.body = error
	ctx.response.body = error
	/*ctx.response.body = {
		message: err.message,
		error:error
	};*/

	logErrors.error('ctx.response2:',ctx.response);
});

module.exports = app;
