import {combineReducers} from 'redux'

const CHANGE_COLLAPSED = 'CHANGE_COLLAPSED';
const SAVE_NOTICES = 'SAVE_NOTICES';

//action
export const change_collapsed = (payload)=>({
	type:CHANGE_COLLAPSED,
	payload:!payload
})


export const changeLayoutCollapsed = (state,{payload=false})=>{
	return payload
	/*return {
		...state,
		collapsed:payload
	}*/
}

export const saveNotices = (state,{payload={}})=>{
	return payload
	/*return {
		...state,
		notices: payload,
	};*/
}
export default combineReducers({
	collapsed:changeLayoutCollapsed,
	notices:saveNotices
})