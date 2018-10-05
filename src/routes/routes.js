import React from "react";
import Bundle from "../utils/Bundle";

import BasicLayout from "../layouts/BasicLayout";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";
import News from "../pages/News";
import Analysis from "../pages/Dashboard/Analysis";
import Login from "../pages/User/Login";

import BasicForm from '../pages/Forms/BasicForm';
import StepForm from '../pages/Forms/StepForm';
import StepFormInfo from '../pages/Forms/StepForm/Step1'
import StepFormConfirm from '../pages/Forms/StepForm/Step2'
import StepFormResult from '../pages/Forms/StepForm/Step3'
import AdvanceForm from '../pages/Forms/AdvanceForm';
import TableList from '../pages/List/TableList';

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
		path:"/form/step-form",
		redirect:"/form/step-form/info",
		name: "stepform",
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
				exact: true
			},
			{
				path:'/dashboard/analysis',
				component:lazyLoad(Analysis),
				name:'Analysis',
				exact: true
			},{
				path:'/form',
				icon:'form',
				name:'form',
				routes:[
					{
						path:'/form/basic-form',
						name:'BasicForm',
						component:lazyLoad(BasicForm),
						exact:true
					},
					{
						path:'/form/step-form',
						name:'StepForm',
						component:lazyLoad(StepForm),
						// hideChildrenInMenu: true,
						routes:[
							{
								path:'/form/step-form/info',
								name:'info',
								component:lazyLoad(StepFormInfo),
								exact:true
							},
							{
								path:'/form/step-form/confirm',
								name:'confirm',
								component:lazyLoad(StepFormConfirm),
								exact:true
							},
							{
								path:'/form/step-form/result',
								name:'result',
								component:lazyLoad(StepFormResult),
								exact:true
							},
						]
					},
					{
						path:'/form/advanced-form',
						name:'AdvanceForm',
						component:lazyLoad(AdvanceForm),
						exact:true
					}
				]
			},{
				path:'/list',
				icon:'list',
				name:'list',
				routes:[
					{
						path:'/list/table-list',
						name:'TableList',
						component:lazyLoad(TableList),
						exact:true
					}
				]
			}
		]
	}

]