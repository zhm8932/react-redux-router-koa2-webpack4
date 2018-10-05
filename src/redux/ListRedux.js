import {combineReducers} from 'redux';
import {FETCH_API} from "../utils/fetch";
import {advance, basic, step} from "./FormRedux";


const RULE 			= 	'RULE';
const RULE_SUCESS 	= 	'RULE_SUCESS';
const RULE_ERROR 	= 	'RULE_ERROR';

export const getRules = ({url,data,method})=>({
	[FETCH_API]:{
		types:[RULE,RULE_SUCESS,RULE_ERROR],
		url,
		data,
		method
	}
});

export const rule = (state={list:[],pagination:{}},action)=>{
	switch (action.type) {
		case RULE:
			return {
				...state,
				loading:true,
				error:false
			}
		case RULE_SUCESS:
			return {
				...state,
				loading: false,
				error:false,
				...action
			}
		case RULE_ERROR:
			return {
				...state,
				loading:false,
				error:true,
				...action
			}
		default :
			return state;
	}
}

export default combineReducers({rule})