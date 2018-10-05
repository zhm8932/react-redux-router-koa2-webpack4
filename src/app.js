import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux'

import Routes from './routes';
import configureStore from './redux/configureStore';
import 'sass/globals.scss';
import history from './utils/history';

const store = configureStore();
console.log("state:",store.getState())

ReactDOM.render(
	<Provider store={store}>
		<Routes history={history}/>
	</Provider>,
	document.getElementById('root')
);


if (module.hot) {
	module.hot.accept();
}