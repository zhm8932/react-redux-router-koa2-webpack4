import {createStore,applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import rootReducer from "./reducers";

import fetchMiddleware from '../utils/fetchMiddleware';

const middleware = [thunk,fetchMiddleware];

if(process.env.NODE_ENV!=='production'){
	middleware.push(createLogger())
}


//createStore 生成 Store
export default function configureStore() {
	const store = createStore(
		rootReducer,
		applyMiddleware(...middleware)
	);
	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./reducers');
			store.replaceReducer(nextRootReducer);
		});
	}
	console.log("store:",store)
	return store
}