/**
 * Created by haiming.zeng on 2017/12/22.
 */

const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('./redisStore');


function use(app) {
	app.use(cookieParser());
	const sessionStore = {
		secret:config.session.secret,
		name:config.session.name,
		cookie:{
			sameSite:'lax',			//true、false、'lax'、'strict'
			maxAge:config.session.maxAge,	// 有效期，单位是毫秒
			secure: false   //HTTPS环境下使用
		},
		resave:false,		//重新保存
		saveUninitialized: true

	}
	logger.trace("sessionStore:",JSON.stringify(sessionStore))
	if(config.session.store === 'redis'){
		sessionStore.store = RedisStore.getInstance();
	}else{
		logger.trace("session 内存存储")
	}
	app.use(session(sessionStore));

}

module.exports = {
	use:use
}