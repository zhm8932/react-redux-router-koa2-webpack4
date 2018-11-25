const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
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

// error handler
// onerror(app);

/*onerror(app, {
	// all: '',
	text: 'text',
	json: 'json',
	html: 'html',
	redirect: 'https://www.npmjs.com/package/koa-onerror'
})*/

// middlewares
//koaBody必须放在bodyparser前面
app.use(koaBody({
	multipart: true,
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
		await ctx.render('app', {
			title: 'Koa2-React'
		})
	}
})

const handler = async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		console.log("handler-err:",err)
		ctx.response.status = err.statusCode || err.status || 500;
		// ctx.response.body = {
		ctx.body = {
			message: err.message||'系统错误！！！'
		};
	}
};

app.use(handler);

// error-handling
app.on('error',async (err, ctx) => {
	logErrors.error('server err:',JSON.stringify(err));
	let error = utils.handlerError(err,ctx);
	// ctx.body = error;

	ctx.response.status = err.statusCode || err.status || 500;
	ctx.body = error
	/*ctx.response.body = {
		message: err.message,
		error:error
	};*/
});

module.exports = app;
