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

router.get('/currentUser',(ctx, next)=> {
	let data = {
		name: 'Serati Ma',
		avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
		userid: '00000001',
		email: 'antdesign@alipay.com',
		signature: '海纳百川，有容乃大',
		title: '交互专家',
		group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
		tags: [
			{key: '0', label: '很有想法的'},
			{key: '1', label: '专注设计'},
			{key: '2', label: '辣~'},
			{key: '3', label: '大长腿'},
			{key: '4', label: '川妹子'},
			{key: '5', label: '海纳百川'}
		],
		notifyCount: 12,
		country: 'China',
		geographic: {
			province: {label: '浙江省', key: '330000'},
			city: {label: '杭州市', key: '330100'}
		},
		address: '西湖区工专路 77 号',
		phone: '0752-268888888'
	}
	ctx.body = data;
})

module.exports = router
