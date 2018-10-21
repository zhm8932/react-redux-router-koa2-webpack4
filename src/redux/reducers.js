import {combineReducers} from 'redux'
import home from '../redux/HomeRedux';
import user from '../redux/UserRedux';
import form from '../redux/FormRedux';
import list from '../redux/ListRedux';
import global from '../redux/globalRedux';

export default combineReducers({
	global,
	home,
	user,
	form,
	list
});