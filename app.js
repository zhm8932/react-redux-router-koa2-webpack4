const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const favicon = require('koa-favicon');
const path = require('path')

const index = require('./server/routes/index')
const users = require('./server/routes/users')

const logUtil = require('./server/utils/logger');
const proxy = require('./server/utils/proxy');
const logger = logUtil.getLogger('log');
const logAccess = logUtil.getLogger('access');

global.logger = logger;     	//日志
global.proxys = proxy;       	//封装HTTP请求

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
console.log("__dirname:",__dirname)
app.use(require('koa-static')(__dirname + '/public'))
app.use(favicon(__dirname + '/public/images/favicon.ico'))

app.use(views(__dirname + '/server' +'/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start;
  logAccess.info(`${ctx.method} ${ctx.url} - ${ms} --access `);
  logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async(ctx, next) =>{
	//模板引擎配置全局的变量
	ctx.state.keywords = 'React-koa2首页';
	ctx.state.description = 'React-koa2首页描述';
	await next()
})


// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
