import fetchs from '../../utils/fetch';
import Cookies from 'js-cookie';
import {BrowserRouter} from 'react-router-dom';

export const login = data=>({
	type:'LOGIN',
	data:data
})