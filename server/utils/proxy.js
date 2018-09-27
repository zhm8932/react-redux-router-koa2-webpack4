const config = require('../../config');
const request = require('request');
const qs = require('querystring');
const uuid = require('node-uuid');
const fs = require('fs');
const tools = require('./tools');
const utils = require('../utils');
const moment = require('moment');
const logUtil = require('../utils/logger');
const logError = logUtil.getLogger('error');
const logWarn = logUtil.getLogger('warn');


String.prototype.trim = function () {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};

/*
 * 发送请求
 * @param    req                     请求request对象
 * @param    res                     响应request对象
 * @param    options     {Object}    自定义请求参数
 *               method  {String}    http请求方法GET,POST,PUT,DELETE
 *               path    {String}    请求路径 path由config.apiType,config.v和options.path拼接组成
 *               data    {Object}    请求的参数
 *               success {Function}  请求成功
 *               error {Function}    请求失败
 * */

const proxy = function (req,res,opts) {

	const method = opts && opts.method && opts.method.toUpperCase() || req.method || 'GET';
	const data = opts && opts.data || {};
	const {api,port,protocol} = config;
	const isAutoError = opts.isAutoError||true;
	const isNotAutoLogin = opts.isNotAutoLogin||false;  //不处理自动跳转登录页
	const apiType = opts.apiType ? opts.apiType : config.apiType.mslife;
	let path = `/${apiType}/${opts.path}`;
	path = apiType === config.apiType.spiderapi?`/${opts.path}`:path;
	let query = "",key;
	//处理参数
	if (method === 'GET') {
		//GET请求有参数两种传递方式
		for (key in data) {
			if (data.hasOwnProperty(key)) {
				var strVal = data[key];
				query += opts.isRestful? `/${strVal}`:`&${key}=${strVal}`;
			}
		}
		query = query.indexOf("&") === 0 ? query.replace(/&/, "?") : query;
	}else{
		for (key in data) {
			if (data.hasOwnProperty(key)) data[key] = tools.htmlEncode(data[key]);
		}
	}
	path += encodeURI(query);
	let uri = `${protocol}://${api[apiType]}:${port}${path}`;
	if(port==='80'){ uri = `${protocol}://${api[apiType]}${path}`; }
	const token = req.session.token||config.XToken;
	const XClient = req.session.XClient||config.XClient;
	const appKey = req.session.appKey||config.XApplicationId;

	//记录日志
	let logMessage = [],logParams=[];

	// logger.info("session:",JSON.stringify(req.session));
	return new Promise(function (resolve,reject) {
		const options = {
			uri: uri,
			method: method,
			body: JSON.stringify(data),
			// gzip:true,
			headers: {
				"Content-Type": "application/json",
				'X-Application-Id': appKey,  				//应用标识
				'X-Version': config.v,						//版本
				'X-Token': token,							//用户登录后返回
				'X-Sign': '',								//签名数据
				'X-Timestamp': Date.now(),					//时间戳
				'X-Client': XClient,
				'X-Sign-Headers': Date.now() +' '+ appKey,	//参与签名的头
				'X-Request-Id': uuid.v1().split('-').join(''),				//每次请求唯一ID
				'X-Env': config.env,						//环境标识
			}
		};
		if(method==='GET'){
			options.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
		}
		options.headers = Object.assign({},options.headers,opts.headers);
		const contentType = req.headers['content-type'];

		//接入pinpoint
		global.pinpointConnectRequestHeaders && global.pinpointConnectRequestHeaders(req,options, options.uri);

		if(/form-data/.test(contentType)){
			delete options.body;
			options.headers["Content-Type"] = 'multipart/form-data;';
		}


		/*logger.info("options:",JSON.stringify(options));
		logger.info("入参:",JSON.stringify(opts));*/


		const start = new Date();  //请求开始时间
		const reqs = request(options,function (error,response,body) {
			const ms = new Date() - start;  //耗时
			//处理日志
			logMessage.push('API地址：%s');
			logParams.push(uri+"  耗时："+ms+"ms");
			logMessage.push('\nSession：%s');
			logParams.push(JSON.stringify(req.session));
			logMessage.push('\nOptions：%s');
			logParams.push(JSON.stringify(options));
			logMessage.push('\n入参：%s')
			logParams.push(JSON.stringify(opts));
			logMessage.push('\n出参：%s');
			logParams.push(body);
			// logger.info("API地址",uri,"耗时：",ms+"ms",":\n出参:",body);

			// 汇总日志内容
			logParams.unshift(logMessage.join(''));
			logger.info.apply(logger,logParams);
			var resObj = null;
			if(error){
				logError.error("系统error:",JSON.stringify(error),error)
				var err = utils.handlerError(error);
				if(utils.isAjax(req)){
					return res.send(err)
				}
				if(isAutoError){
					return res.render('error',{error})
				}
				reject(err);
			}
			try {
				if(!body){
					resObj = {success: true,message:'未返回数据'};
				}else if(/404 Not Found/.test(body)){
					resObj = {success: false, code:404, message:'服务器地址异常'};
					logError.info("API地址:",uri)
					logError.error("出参:",body)
				}else if(/502 Bad Gateway/.test(body)){
					resObj = {success: false, code:502, message:'502 Bad Gateway'};
					logError.info("API地址:",uri)
					logError.error("出参:",body)
				}else if(/504 Gateway Time-out/.test(body)){
					resObj = {success: false, code:504, message:'504 Gateway Time-out'};
					logError.info("API地址:",uri)
					logError.error("出参:",body)
				}else if(/302 Found/.test(body)){
					resObj = {success: false, code:302, message:'系统异常，请稍后重试'};
					logError.info("API地址:",uri)
					logError.error("出参:",body)
				} else if(/^\d*$/.test(body)||/<html>/.test(body)||/^<*>$/.test(body)){
					resObj = body
				} else {
					resObj = body?JSON.parse(body):body;
				}

				//处理数据结构
				if(typeof resObj === 'object'){
					//自动处理登录
					/*
					* 48860007 登录验证已过期
					* */
					if(resObj.code==='60000003'||resObj.code==='60000004'||resObj.code==='48860007'){
						if(!isNotAutoLogin){
							return utils.handlerLogin(req,res,resObj)
						}
						//记录APP登录失效的状态
						req.session.isAjax = false;
						if(utils.isAjax(req)){
							req.session.isAjax = true;
						}
					}
					//添加异常时的code,status为数字的时候
					if(resObj.status&&!isNaN(resObj.status)){
						resObj.code = resObj.status
					}
					//result 是个对象
					if(resObj.result&&typeof resObj.result ==='object'){
						let {result} = resObj;
						//修改返回的数据结构
						Object.assign(resObj, result);
						delete resObj.result;
					}
				}
				//去掉请求成功时的code
				if(resObj.code ==='0'){
					delete resObj.code
				}
				// console.log("result:::",typeof resObj,typeof resObj&&JSON.stringify(resObj))
			}catch (err){
				res.locals.data = err;
				logWarn.error("err:",err)
			}
			resolve(resObj);
		});
		//文件上传
		if(/form-data/.test(contentType)){
			delete options.body;
			options.headers["Content-Type"] = 'multipart/form-data;';
			options.formData = data;
			var form = reqs.form();
			if(data&&typeof data === 'object'){
				for (key in data){
					if(data.hasOwnProperty(key)){
						key!=='file'&&form.append(key, data[key]);
					}
				}
			}
			const files = req.files;
			const filePath = files&&files.file?files.file.path:data.file;
			const source = fs.createReadStream(filePath);
			form.append("file", fs.createReadStream(filePath));

			//删除临时文件夹文
			source.on('end', function() {
				console.log("删除临时文件：",filePath)
				fs.unlinkSync(filePath);
			});   //delete
			source.on('error', function(err) {
				console.log("删除文件失败")
			});
		}
	})
};

module.exports = proxy;
