/**
 * Created by haiming.zeng on 2017/12/22.
 *
 * Redis存储服务配置，支持两种模式：local,cluster
 *
 *
 */
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const ioRedos = require('ioredis');

const redisConfig = config.redis;
const redisMode = redisConfig.mode;
module.exports.getInstance = function () {
	let store;
	if(redisMode === 'cluster'){
		logger.trace("redis 集群存储")
		store = new RedisStore({
			logErrors:true,					//是否记录客户端错误
			prefix:config.session.prefix,	//键前缀默认为“sess：”
			client:new ioRedos.Cluster(redisConfig.cluster)
		})
	}else if(redisMode === 'local'){
		logger.trace("redis 本地存储")
		store = new RedisStore({
			host:redisConfig.local.host,
			port:redisConfig.local.port,
			pass:redisConfig.local.pass,
			logErrors:true,
			prefix:config.session.prefix
		})
	}
	return store;

}