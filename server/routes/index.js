const router = require('koa-router')()
const utils = require('../utils');

router.use(async function (ctx,next) {
  console.log("originalUrl:",ctx.originalUrl,"method:",ctx.method);
  await next()
})
/*router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})*/

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/form', function (ctx, next) {
	let body = ctx.request.body;
	console.log("body:", body)
	let random = Math.random()*10;
	console.log("random:",random)
	ctx.body = {
		success: random>5 ? true:false,
		message: "表单提交成功",
		data: body
	}
});
/*
router.get('*', async (ctx, next) => {
	if (utils.isAjax(ctx.request)) {
		console.log("ajax请求！！！")
		/!*ctx.body={
			success: false,
			code:404,
			message:'服务地址不存在，请检查！'
		}*!/
		await next();
	}else{
		await ctx.render('app', {
			title: 'Koa2-React'
		})
	}

})*/

module.exports = router
