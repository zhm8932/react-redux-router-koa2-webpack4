
import {combineReducers} from 'redux';

import list, {loadArticles} from '../components/Home/Home.redux';

export default combineReducers({
	list
})

export const actions = {
	loadArticles
}