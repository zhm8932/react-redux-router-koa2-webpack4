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

import BasicProfile from "../pages/Profile/BasicProfile";
import AdvancedProfile from "../pages/Profile/AdvancedProfile";

import Exception403 from "../pages/Exception/403";
import Exception404 from "../pages/Exception/404";
import Exception500 from "../pages/Exception/500";


import Center from "../pages/Account/Center";
import Settings from "../pages/Account/Settings";

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
			},{
				path:'/profile',
				icon:'profile',
				name:'profile',
				routes:[
					{
						path:'/profile/basic',
						name:'basic',
						component:lazyLoad(BasicProfile),
						exact:true
					},
					{
						path:'/profile/advanced',
						name:'advanced',
						component:lazyLoad(AdvancedProfile),
						exact:true
					}
				]
			},,{
				path:'/exception',
				icon:'exception',
				name:'exception',
				routes:[
					{
						path:'/exception/403',
						name:'not-permission',
						component:lazyLoad(Exception403),
						exact:true
					},
					{
						path:'/exception/404',
						name:'not-find',
						component:lazyLoad(Exception404),
						exact:true
					},
					{
						path:'/exception/500',
						name:'server-error',
						component:lazyLoad(Exception500),
						exact:true
					}
				]
			},{
				path:'/account',
				icon:'user',
				name:'account',
				routes:[
					{
						path:'/account/center',
						name:'center',
						component:lazyLoad(Center),
						exact:true
					},
					{
						path:'/account/settings',
						name:'settings',
						component:lazyLoad(Settings),
						exact:true
					}
				]
			}
		]
	}

]