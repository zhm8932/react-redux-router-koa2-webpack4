import fetchs,{FETCH_API} from './fetch'
const fetchMiddleware = store => next => action => {
	const fetchAPI = action[FETCH_API];

	console.log("fetchMiddleware---action:",action)
	console.log("是否自动处理---:",!action.url,"types:",!Array.isArray(action.types),"fetchAPI:",fetchAPI)
	if(!fetchAPI) {
		console.log("中间件---不自动处理状态")
		return next(action);
	}

	const {types,url,method,data,mode} = fetchAPI;
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
		console.log("fetch----result:",result)
		let {data:payload,...otherData} = result;
		return next(actionWith({
			type:SUCCESS,
			loading:false,
			error:false,
			...otherData,
			...payload
			// payload:result
		}))
	})
	.catch(err => {
		console.log("fetch---err:",err,JSON.stringify(err))
		return next(actionWith({
			type:ERROR,
			loading:false,
			error:err,
			message:err&&err.message||'系统异常，请稍后重试！'
		}));
	});
};

export default fetchMiddleware