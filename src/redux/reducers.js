import {combineReducers} from 'redux'
import chart from '../redux/ChartRedux';
import home from '../redux/HomeRedux';
import user from '../redux/UserRedux';
import form from '../redux/FormRedux';
import list from '../redux/ListRedux';
import global from '../redux/globalRedux';
import setting from '../redux/settingRedux';

export default combineReducers({
	global,
	home,
	user,
	form,
	list,
	chart,
	setting
});