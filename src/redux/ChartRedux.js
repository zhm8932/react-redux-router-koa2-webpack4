import {combineReducers} from 'redux';
import {FETCH_API} from '../utils/fetch';

const initialState = {
	loading:false,
	error:false,
};

const FAKE_CHART 			= 	'FAKE_CHART';
const FAKE_CHART_SUCCESS 	= 	'FAKE_CHART_SUCCESS';
const FAKE_CHART_ERROR 		= 	'FAKE_CHART_ERROR';

export const getFakeChart = ({url,data,method})=>({
	[FETCH_API]:{
		types:[FAKE_CHART,FAKE_CHART_SUCCESS,FAKE_CHART_ERROR],
		method,
		url,
		data
	}
})

export const fakeChart = (state={},action)=>{
	switch (action.type) {
		case FAKE_CHART:
			return {
				...state,
				loading:true,
				error: false
			}
		case FAKE_CHART_SUCCESS:
			return {
				...state,
				loading:false,
				error:false,
				...action
			}
		case FAKE_CHART_ERROR:
			return {
				...state,
				loading:false,
				error:true,
				...action
			}
		default :
			return state
	}
}



const TAGS 			= 	'TAGS';
const TAGS_SUCCESS 	= 	'TAGS_SUCCESS';
const TAGS_ERROR 	= 	'TAGS_ERROR';


const NOTICE 			= 	'NOTICE';
const NOTICE_SUCCESS 	= 	'NOTICE_SUCCESS';
const NOTICE_ERROR 	    = 	'NOTICE_ERROR';



const ACTIVITES 			= 	'ACTIVITES';
const ACTIVITES_SUCCESS 	= 	'ACTIVITES_SUCCESS';
const ACTIVITES_ERROR 	    = 	'ACTIVITES_ERROR';

export default combineReducers({fakeChart})