var md5 = require("blueimp-md5");

exports.isAjax = function (req) {
	return req.headers['X-Requested-With'] || req.headers['x-requested-with'] === 'XMLHttpRequest';
}

//判断浏览器版本
exports.browser = function (req) {
	const u = req.headers['user-agent'];
	if(!utils.isAjax(req)){
		// logger.debug("u:",u)
	}
	const browser = {
		trident: u.indexOf('Trident') > -1, //IE内核
		presto: u.indexOf('Presto') > -1, //opera内核
		webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
		gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
		ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
		iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
		iPad: u.indexOf('iPad') > -1, //是否iPad
		weixin: u.indexOf('MicroMessenger') !== -1, //是否微信
		aliApp: u.indexOf('AliApp') !== -1, //是否支付宝
		webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
		ie: u.indexOf('MSIE') > -1, //
		mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端,包括iPad
		pc: !/(Android|iPhone|iPod|iOS|SymbianOS|Windows Phone|iPad)/i.test(u) , //PC端
		webview : !!u.match(/AppleWebKit.*Mobile.*mssxxf/i), //webview
	};
	// console.log("browser:",JSON.stringify(browser))
	return browser
}

exports.handlerError = function (error,ctx) {
	let err = {};
	let status;
	let message = "";
	switch (error&&error.code) {
		case 'ENOENT':
			status = '404';
			message = '服务器地址异常';
			break;
		case 'ENOTFOUND':
			message = "服务器异常";
			break;
		case 'ETIMEDOUT':
			message = "数据库连接超时";
			break;
		case 'ECONNREFUSED':
			message = "服务连接异常";
			break;
		default:
			message = error.message || "系统异常,请稍后重试";
	}
	err.message = message;
	err.success = false;
	let key;
	for (key in error) {
		err[key] = error[key];
	}
	// console.log("err----1:",JSON.stringify(err))
	// console.log("ctx----1:",JSON.stringify(ctx))
	if(ctx){
		let {request,response} = ctx;
		if(request){
			err.method 	= request.method;
			err.url 	= request.url;
			err.message = request.message||err.message;
		}
		if(response){
			err.message = err.message || response.message;
			err.status  = response.status ||status
		}
	}
	logger.warn("err:",JSON.stringify(err))
	return err;
}
exports.handlerLogin = function (req,res,resObj) {
	if(utils.isAjax(req)){
		logger.info("重新登录吧!!");
		return res.send(resObj)
	}else{
		var mobile = req.session&&req.session.mobile?req.session.mobile:'';
		if(browser.webview){
			logger.debug("跳转APP登录");
			return res.redirect('app://msslife.zhm.com/login');
		}else if(mobile){
			return res.render('users/login')
		}else{
			return res.render('users/mobile')
		}
	}
}
//继承
exports.extend = function () {
	var copy, name, options,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length;
	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}
	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && typeof target!=='function' ) {
		target = {};
	}
	if ( i === length ) {
		target = this;
		i--;
	}
	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null) {
			// Extend the base object
			for (name in options ) {
				if(options.hasOwnProperty(name)){
					copy = options[ name ];
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
					target[ name ] = copy;
				}
			}
		}
	}
	// Return the modified object
	return target;
};

//签名排序
exports.getSign = function (params) {
	logger.trace("params:",JSON.stringify(params))
	var property;
	//用来给属性名称排序
	var propertyArr = [];

	//用来存放排好序的属性名和属性值
	var paramsArr = [];
	if ( typeof params === "object" ) {
		//给属性名排序
		for(property in params){
			if (params.hasOwnProperty(property)) {
				propertyArr.push(property);
			}
		}
	}

	propertyArr.sort();

	//拼接属性名和属性值
	for(let i = 0; i <propertyArr.length; i++){
		//为json或数组时,要stringify
		if((typeof(params[propertyArr[i]]) === "object" && Object.prototype.toString.call(params[propertyArr[i]]).toLowerCase() === "[object object]" && !params[propertyArr[i]].length)|| Array.isArray(params[propertyArr[i]])){
			paramsArr.push(propertyArr[i] + JSON.stringify(params[propertyArr[i]]));
		}else{
			paramsArr.push(propertyArr[i] + params[propertyArr[i]]);
		}
	}
	var str =  paramsArr.join('')+params.secretKey;
	return md5(str).toString().toUpperCase()
}

