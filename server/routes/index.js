const router = require('koa-router')()
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const koaBody = require('koa-body');
const utils = require('../utils');
const ROOT = path.join(__dirname, '../../');

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
	let random = Math.random() * 10;
	console.log("random:", random)
	ctx.body = {
		success: random > 5 ? true : false,
		message: "表单提交成功",
		data: body
	}
});

//文件上传
router.post('/uploadFile', (ctx) => {
	// console.log("files:",ctx.request.files);
	const file = ctx.request.files.file; //获取上传的文件
	// console.log("file:",file);
	// 创建可读流
	const reader = fs.createReadStream(file.path);
	const ext = file.name.split('.').pop(); // 获取上传文件扩展名
	let uploadPathRoot = path.join(path.join(ROOT, '/public', '/upload'));

	//生成文件上传目录
	if (!fs.existsSync(uploadPathRoot)) {
		fs.mkdirSync(uploadPathRoot);
	}
	let uploadPath = path.join(path.join(uploadPathRoot, moment(new Date()).format('YYYYMMDD')));
	if (!fs.existsSync(uploadPath)) {
		fs.mkdirSync(uploadPath);
	}
	//文件绝对路径
	let absolutePath = path.join(uploadPath, `/${moment(new Date()).format('YYYYMMDDhhmmss')}${Math.floor(Math.random() * 10000)}.${ext}`);
	console.log("absolutePath:", absolutePath)
	// 创建可写流
	const upStream = fs.createWriteStream(absolutePath);

	//删除临时文件
	reader.on('end', function () {
		console.log('删除临时文件:', file.path)
		fs.unlinkSync(file.path);
	})
	// 可读流通过管道写入可写流
	reader.pipe(upStream);
	let filePathArr = absolutePath.split('public');
	ctx.body = {
		message: '上传成功',
		file: filePathArr[1]
	};
})
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
