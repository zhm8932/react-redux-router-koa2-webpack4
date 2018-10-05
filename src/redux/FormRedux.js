import {combineReducers} from 'redux';
import {FETCH_API} from '../utils/fetch';

const initialState = {
	loading:false,
	error:false,
};

/*
 * action 类型
 */
const BASIC_FORM 			= 	'BASIC_FORM';
const BASIC_FORM_SUCESS 	= 	'BASIC_FORM_SUCESS';
const BASIC_FORM_ERROR 		= 	'BASIC_FORM_ERROR';

/*
 * action 创建函数
 */
export const handleBasicSubmit = ({url,data})=>({
	type:'BASIC_FORM',
	data,
	url
});

export const handleBasicSubmitSuccess = (data={})=>({
	type:'BASIC_FORM_SUCESS',
	data
});

export const handleBasic = ({url,data,method})=>({
	[FETCH_API]:{
		types:[BASIC_FORM,BASIC_FORM_SUCESS,BASIC_FORM_ERROR],
		url,
		data,
		method
	}
});

/*
* reducers
* */
export const basic = (state=initialState,action)=>{
	console.log("action:",action)
	switch (action.type) {
		case BASIC_FORM:
			return {
				...state,
				loading:true,
				error:false
			}
		case BASIC_FORM_SUCESS:
			return {
				...state,
				loading: false,
				error:false,
				payload:action.payload
			}
		case BASIC_FORM_ERROR:
			return {
				...state,
				loading:false,
				error:true,
				payload:action.payload
			}
		default :
			return state;
	}
}

const STEP_FORM 		= 	'STEP_FORM';
const STEP_FORM_SUCESS 	= 	'STEP_FORM_SUCESS';
const STEP_FORM_ERROR 	= 	'STEP_FORM_ERROR';

export const handleStepSubmit = ({url,data,method})=>({
	[FETCH_API]:{
		types:[STEP_FORM,STEP_FORM_SUCESS,STEP_FORM_ERROR],
		url,
		data,
		method
	}
});

const initStep = {
	payAccount: 'ant-design@alipay.com',
	receiverAccount: 'test@example.com',
	receiverName: '张三',
	amount: '500',
}
export const step = (state=initStep,action)=>{
	switch (action.type) {
		case STEP_FORM:
			return {
				...state,
				loading:true,
				error:false
			}
		case STEP_FORM_SUCESS:
			return {
				...state,
				loading: false,
				error:false,
				...action
			}
		case STEP_FORM_ERROR:
			return {
				...state,
				loading:false,
				error:true,
				...action,
				// payload:action.payload
			}
		default :
			return state;
	}
}

const ADVANCE_FORM 			= 	'ADVANCE_FORM';
const ADVANCE_FORM_SUCESS 	= 	'ADVANCE_FORM_SUCESS';
const ADVANCE_FORM_ERROR 	= 	'ADVANCE_FORM_ERROR';

export const advance = (state=initialState,action)=>{
	switch (action.type) {
		case ADVANCE_FORM:
			return {
				...state,
				loading:true,
				error:false
			}
		case ADVANCE_FORM_SUCESS:
			return {
				...state,
				loading: false,
				error:false,
				payload:action.payload
			}
		case ADVANCE_FORM_ERROR:
			return {
				...state,
				loading:false,
				error:true,
				payload:action.payload
			}
		default :
			return state;
	}
}

export default combineReducers({basic,step,advance})