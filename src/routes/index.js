import React from "react";
import Bundle from '../utils/Bundle';
import renderRoutes from './renderRoutes';
import LocalWrapper from '../components/LocalWrapper'
import {
	BrowserRouter as Router,
	Route,
	Link,
	NavLink,
	Redirect,
	Switch,
	IndexRoute
} from 'react-router-dom'


//按需加载
const lazyLoad = (comp) => (props) => (
	<Bundle load={comp}>
		{(Container) => <Container {...props}/>}
	</Bundle>
);

import BasicLayout from '../layouts/BasicLayout';
import Header from '../layouts/Header';
import Home from '../pages/Home';
import News from '../pages/News';
import Analysis from '../pages/Dashboard/Analysis';


import routes from './routes'

const RouteWithSubRoutes = route => (
	<Route
		path={route.path}
		exact ={route.exact}
		render={props => {
			return (<route.component {...props} routes={route.routes} />)
		}}
	/>
);

const Routes = ()=>(
	routes.map((route, i) => <RouteWithSubRoutes key={i} {...route}/>)
)

const RouteWrapper = ()=>(
	<LocalWrapper>
		<Router>
			{renderRoutes(routes,{})}
		</Router>
	</LocalWrapper>
)

export default RouteWrapper