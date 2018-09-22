import React from "react";
import Bundle from "../utils/Bundle";

import BasicLayout from "../layouts/BasicLayout";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";
import News from "../pages/News";
import Analysis from "../pages/Dashboard/Analysis";
import Login from "../pages/User/Login";

//按需加载
const lazyLoad = (comp) => (props) => (
	<Bundle load={comp}>
		{(Container) => <Container {...props}/>}
	</Bundle>
);

export default [
	{
		path:"/user",
		redirect:"/user/login",
		exact:true
	},
	{
		path:"/login",
		redirect:"/user/login",
		exact:true
	},
	{
		path:"/user",
		component:UserLayout,
		routes:[
			{
				path:'/user/login',
				component:lazyLoad(Login),
				name:'登陆',
				"exact": true
			}
		]
	},
	{
		path:"/",
		component:BasicLayout,
		routes:[
			{
				path:'/',
				name:'首页',
				component:lazyLoad(Home),
				"exact": true
			},
			{
				path:'/news',
				component:lazyLoad(News),
				name:'企业动态',
				"exact": true
			},
			{
				path:'/dashboard/analysis',
				component:lazyLoad(Analysis),
				name:'Analysis',
				"exact": true
			}
		]
	}

]