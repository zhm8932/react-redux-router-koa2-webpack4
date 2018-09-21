import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux'

import Routes from './routes';
import configureStore from './redux/configureStore';
import 'sass/globals.scss';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Routes/>
	</Provider>,
	document.getElementById('root')
);


if (module.hot) {
	module.hot.accept();
}