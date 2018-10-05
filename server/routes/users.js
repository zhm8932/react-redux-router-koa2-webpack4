const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
	ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
	ctx.body = 'this is a users/bar response'
})

router.get('/detail/:id', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = id
})

router.post('/login', function (ctx, next) {
	let body = ctx.request.body;
	let query = ctx.request.query;
	console.log("body:", body)
	console.log("query:", query)
	ctx.body = {
		success: true,
		message: '登录成功',
		token: 'Token-'+new Date().getTime()
	}
})


router.get('/test', async (ctx, next) => {
	console.log("test---测试")
	await ctx.render('test', {
		title: 'Koa2-React'
	})
})

module.exports = router
