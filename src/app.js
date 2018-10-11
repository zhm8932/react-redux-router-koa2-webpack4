import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux'

import Routes from './routes';
import configureStore from './redux/configureStore';
import 'sass/globals.scss';
import history from './utils/history';

const store = configureStore();
console.log("state:",store.getState())

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';

ReactDOM.render(
	<Provider store={store}>
		<Routes history={history}/>
	</Provider>,
	document.getElementById('root')
);


if (module.hot) {
	module.hot.accept();
}