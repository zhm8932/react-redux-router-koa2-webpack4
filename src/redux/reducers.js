import {combineReducers} from 'redux'
import home from '../redux/HomeRedux';
import user from '../redux/UserRedux';
import form from '../redux/FormRedux';
import list from '../redux/ListRedux';

export default combineReducers({
	home,
	user,
	form,
	list
});