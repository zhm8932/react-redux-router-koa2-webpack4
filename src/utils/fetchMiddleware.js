import fetchs,{FETCH_API} from './fetch'
import {message} from 'antd';
const fetchMiddleware = store => next => action => {
	const fetchAPI = action[FETCH_API];

	console.log("fetchMiddleware---action:",action)
	console.log("是否自动处理---:",!action.url,"types:",!Array.isArray(action.types),"fetchAPI:",fetchAPI)
	if(!fetchAPI) {
		console.log("中间件---不自动处理状态")
		return next(action);
	}

	const {types,url,method,data,mode,isAuto=true} = fetchAPI;
	console.log("中间件---自动处理状态:",types);
	const [LOADING, SUCCESS, ERROR] = types;

	//获取action对象
	const actionWith = data=>{
		const finalAction = Object.assign({},action,data);
		delete finalAction[FETCH_API];
		return finalAction
	}

	/*next({
		type: LOADING,
		loading: true,
		error:false,
		...action
	});*/
	console.log("actionaction:",action)
	next(actionWith({
		type:LOADING,
		loading: true,
		error:false,
	}))


	return fetchs({url, data,method,mode})
	.then(result => {
		console.log("fetch----result:",typeof result,result)
		let json = typeof result === 'object' ? result : {result:result}
		let {data:payload,...otherData} = json;
		return next(actionWith({
			type:SUCCESS,
			loading:false,
			error:false,
			...otherData,
			...payload
		}))
	})
	.catch(err => {
		console.log("fetch---err:",err,JSON.stringify(err))
		//自动处理错误
		if(isAuto){
			message.error(err.message)
		}else{
			return next(actionWith({
				type:ERROR,
				loading:false,
				error:err,
				message:err&&err.message||'系统异常，请稍后重试！'
			}));
		}
	});
};

export default fetchMiddleware