/**
 * Created by haiming.zeng on 2017/10/29.
 */
import 'whatwg-fetch'

export const FETCH_API = Symbol('Fetch API');

const fetchs = ({url,method='GET',mode='',data={}})=>{
	let params = {};
	//处理data
	for(let key in data){
		if(data[key]){
			params[key] = data[key]
		}
	}
	console.log("params:",params)

	let query = '';
	for (let i in params) {
		query += `${i}=${params[i]}&`;
	}
	method = method.toUpperCase();
	// console.log("query:",query)

	let options = {
		method,
		mode:mode,
		headers:{
			'X-Requested-With':'XMLHttpRequest',  //标记xhr请求
			'Content-Type': 'application/json',
			'key':'71d7c958ddaade37861387ee208f2f67'
		}
	}
	if(method==='GET'){
		url+=`?${query.slice(0,-1)}`
	}else{
		options.body = JSON.stringify(params);
	}
	if(!options.mode){
		delete  options.mode
	}
	return fetch(url,options).then(response=>response.json())
				.catch(err=>{
					console.log("request failed:",err)
				})
}

export default fetchs