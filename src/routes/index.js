import React from "react";
import Bundle from '../utils/Bundle';
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
/*const Routes = ()=>(
	<Router>
		<React.Fragment>
			<Header/>
			<section className="layout">
				<Switch>
					<Route exact path="/" component={lazyLoad(Home)}/>
					<Route exact path="/news" component={lazyLoad(News)}/>
					<Route exact path="/dashboard/analysis" component={lazyLoad(Analysis)}/>
				</Switch>
			</section>
		</React.Fragment>
	</Router>
)*/


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

/*const Rouoters = ()=>(
	<div className="router">
		<Switch>
			<Route exact path="/" component={lazyLoad(Home)}/>
			<Route exact path="/news" component={lazyLoad(News)}/>
			<Route exact path="/dashboard/analysis" component={lazyLoad(Analysis)}/>
		</Switch>
	</div>
)*/
const RouteWrapper = ()=>(
	<Router>
		<React.Fragment>
			<Route children={({ match, ...rest }) => (
				<BasicLayout>
					{match && <Routes {...rest}/>}
				</BasicLayout>
			)}/>

		</React.Fragment>
	</Router>
)

export default RouteWrapper