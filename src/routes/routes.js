import React from "react";
import Bundle from "../utils/Bundle";

import Home from "../pages/Home";
import News from "../pages/News";
import Analysis from "../pages/Dashboard/Analysis";

//按需加载
const lazyLoad = (comp) => (props) => (
	<Bundle load={comp}>
		{(Container) => <Container {...props}/>}
	</Bundle>
);

export default [
	{
		path:'/',
		name:'首页',
		component:lazyLoad(Home),
		"exact": true
	}, {
		path:'/news',
		component:lazyLoad(News),
		name:'企业动态',
		"exact": true
	},{
		path:'/dashboard/analysis',
		component:lazyLoad(Analysis),
		name:'Analysis',
		"exact": true
	}
]