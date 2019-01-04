/**
 * Created by haiming.zeng on 2017/10/29.
 */
import 'whatwg-fetch'

export const FETCH_API = Symbol('Fetch API');

const fetchs = ({url,method='GET',mode='',data={}})=>{
	console.log("fetch:::::url:",url,'method:',method)
	let params = {};
	//处理data
	for(let key in data){
		if(data[key]){
			params[key] = data[key]
		}
	}
	console.log("params:",params)

	method = method.toUpperCase();
	let options = {
		method,
		mode:mode,
		headers:{
			'Accept': 'application/json',
			'X-Requested-With':'XMLHttpRequest',  //标记xhr请求
			'Content-Type': 'application/json',
			'key':'71d7c958ddaade37861387ee208f2f67'
		}
	}
	if(method==='GET'||method==='DELETE'){
		let query = '';
		for (let i in params) {
			query += `${i}=${params[i]}&`;
		}
		url+=`?${query.slice(0,-1)}`
	}else{
		options.body = JSON.stringify(params);
	}
	if(!options.mode){
		delete  options.mode
	}
	console.log('入参options：',options)
	return fetch(url,options).then(response=>{
		// DELETE and 204 do not return data by default
		// using .json will report an error.
		if (response.status === 204) {
			return response.text();
		}
		let result = response.json()
		console.log('response:', response, result)
		return result
	}).catch(err=>{
		console.log("request failed:",err)
	})
}

export default fetchs