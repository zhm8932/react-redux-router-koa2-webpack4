/**
 * Created by haiming.zeng on 2017/12/8.
 */

exports.api = function (req,res) {
	const path = req.params.apiPath;    //请求api地址
	const apiType = req.params.apiType; //api类型
	const method = req.method.toUpperCase();
	const data = method==='GET'?req.query:req.body;

	if(!path){
		return res.send({
			success:false,
			message:"请求方法不存在"
		})
	}
	proxys(req,res,{
		method:method,
		path:api[path],
		apiType: config.apiType[apiType],
		data:data
	}).then(function (json) {
		return res.send(json);
	}).catch(function (err) {
		logger.debug("err:", err)
		return res.send(err);
		// res.send(JSON.stringify(err))
	})
}