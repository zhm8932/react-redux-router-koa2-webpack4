const router = require('koa-router')()
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const koaBody = require('koa-body');
const utils = require('../utils');
const ROOT = path.join(__dirname,'../../');

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


/*router.post('/uploadFile',(ctx)=>{
	console.log("body:",ctx.request.body);
	console.log("files:",ctx.request.files);
	const file = ctx.request.files.file;    // 获取上传文件
	const reader = fs.createReadStream(file.path);    // 创建可读流
	const ext = file.name.split('.').pop();        // 获取上传文件扩展名
	const upStream = fs.createWriteStream(`upload/${Math.random().toString()}.${ext}`);        // 创建可写流
	reader.pipe(upStream);    // 可读流通过管道写入可写流
	ctx.body = '上传成功';
})*/

router.post('/uploadFile',(ctx)=>{
	// console.log("files:",ctx.request.files);
	const file = ctx.request.files.file; //获取上传的文件
	// console.log("file:",file);
	// 创建可读流
	const reader  =fs.createReadStream(file.path);
	const ext = file.name.split('.').pop(); // 获取上传文件扩展名
	// let filePath = path.join(__dirname,'../../public/upload/'+`/${file.name}`);
	// let filePath = path.join(__dirname,'../../public/upload/'+`/${moment(new Date()).format('YYYYMMDDhhmmss')}${Math.random()*1000}.${ext}`);
	let filePath = path.join('/upload'+`/${moment(new Date()).format('YYYYMMDDhhmmss')}${Math.floor(Math.random()*10000)}.${ext}`);
	// 创建可写流
	const upStream = fs.createWriteStream(path.join(ROOT,'/public',filePath));

	//删除临时文件
	reader.on('end',function () {
		console.log('删除临时文件:',file.path)
		fs.unlinkSync(file.path);
	})
	// 可读流通过管道写入可写流
	reader.pipe(upStream);
	ctx.body = {
		message:'上传成功',
		file:filePath
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
