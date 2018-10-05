import {combineReducers} from 'redux'
import Cookies from 'js-cookie';
const initialState = {
	loading:false,
	error:false,
};

let isAuthenticated = Cookies.get('token')||false;

const LOGIN = 'LOGIN';
const LOGIN_SUCESS = 'LOGIN_SUCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

export const login = (state={username:'',isAuthenticated},action)=>{
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				loading:true,
				error:false
			};
		case LOGIN_SUCESS:
			return {
				isAuthenticated:true,
				token:action.data.token,
				username:action.data.username,
				data:action.data,
				loading:false,
				error:false
			};
		case LOGIN_ERROR:
			return {
				...state,
				loading:false,
				error:true
			};
		default:
			return {...initialState,...state}
	}
}

export const forget = (state={username:'',password:'',status:'E01'},action)=>{
	switch (action.type) {
		case 'FORGET':
			return action.json;
		default:
			return {...initialState,...state}
	}
}



export default combineReducers({login,forget})

