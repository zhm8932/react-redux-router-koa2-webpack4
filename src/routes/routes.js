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
import BasicList from '../pages/List/BasicList';
import Result from "../components/Result";
import Success from "../pages/Result/Success";
import Error from "../pages/Result/Error";

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
				name:'home',
				component:lazyLoad(Home),
				"exact": true
			},
			{
				path:'/news',
				component:lazyLoad(News),
				name:'news',
				exact: true
			},
			{
				path:'/dashboard/analysis',
				component:lazyLoad(Analysis),
				name:'analysis',
				exact: true
			},{
				path:'/form',
				icon:'form',
				name:'form',
				routes:[
					{
						path:'/form/basic-form',
						name:'basicform',
						component:lazyLoad(BasicForm),
						exact:true
					},
					{
						path:'/form/step-form',
						name:'stepform',
						component:lazyLoad(StepForm),
						hideChildrenInMenu: true,
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
						name:'advancedform',
						component:lazyLoad(AdvanceForm),
						exact:true
					}
				]
			},{
				path:'/list',
				icon:'table',
				name:'list',
				routes:[
					{
						path:'/list/table-list',
						name:'searchtable',
						component:lazyLoad(TableList),
						exact:true
					},
					{
						path:'/list/basic-list',
						name:'basiclist',
						component:lazyLoad(BasicList),
						exact:true
					}
				]
			},{
				path:'/result',
				icon:'check-circle-o',
				name:'result',
				routes:[
					{
						path:'/result/success',
						name:'success',
						component:lazyLoad(Success),
						exact:true
					},
					{
						path:'/result/error',
						name:'fail',
						component:lazyLoad(Error),
						exact:true
					}
				]
			}
		]
	}

]