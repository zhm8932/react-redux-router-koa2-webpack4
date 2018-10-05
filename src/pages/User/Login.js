import React,{Component} from 'react';
import {connect} from 'react-redux'
import {Link,BrowserRouter,withRouter} from 'react-router-dom';
import { Checkbox, Alert, Icon ,Tabs,Button,Row, Col,Affix} from 'antd';

import Login from '../../components/Login';
import styles from './login.scss';

import {login} from './Login.redux'
import fetchs from "../../utils/fetch";
import Cookies from 'js-cookie';
import history from "../../utils/history";

import PropTypes from "prop-types";

const TabPane = Tabs.TabPane;
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

console.log("BrowserRouter:",BrowserRouter)
console.log("history:",history)

@connect(
	({ login, loading }) => ({
		login,
	}),
	(dispatch,ownPorps)=>(
		{
			// handleLogin
			handleLogin:(data,self)=>{
				console.log("dispatch:",dispatch)
				console.log("ownPorps:",ownPorps)
				fetchs({
					url:'/users/login',
					method:'POST',
					data:data
				})
				.then(json=>{
					console.log("jsonjsonjson:",json)
					console.log("==ownPorps:",ownPorps)
					console.log("==history:",self)
					ownPorps.history.push('/');
					// self.props.history.push('/news')
				})
			}
		}
	)

)

class LoginPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			type: 'account',
			autoLogin: true,
		};
	}
	onTabChange = type => {
		this.setState({ type });
	};

	onGetCaptcha = () =>
		new Promise((resolve, reject) => {
			console.log("this.loginForm:",this.loginForm)
			this.loginForm.validateFields(['mobile'], {}, (err, values) => {
				console.log("err,",err,"values:",values)
				if (err) {
					reject(err);
				} else {
					const { dispatch } = this.props;
					console.log("dispatch:",dispatch)
					/*dispatch({
						type: 'login/getCaptcha',
						payload: values.mobile,
					})*/

				}
			});
		});

	handleSubmit = (err, values) => {
		console.log("err:",err);
		console.log("values:",values);
		const { type } = this.state;
		if (!err) {
			const { dispatch } = this.props;

			let data = values;
			this.props.handleLogin(data)
		}
	};

	changeAutoLogin = e => {
		this.setState({
			autoLogin: e.target.checked,
		});
	};

	renderMessage = content => (
		<Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
	);
	render() {
		const { login, submitting } = this.props;
		const { type, autoLogin } = this.state;
		console.log("contextcontext:",this.context)
		console.log("this.context.router:",this.context.router)
		console.log("this.props.history:",this.props.history)
		return (
			<div className="main login">
				<Login
					defaultActiveKey={type}
					onTabChange={this.onTabChange}
					onSubmit={this.handleSubmit}
					ref={form => {
						this.loginForm = form;
					}}
				>
					<Tab key="account" tab="账户密码登录">
						<UserName name="userName" placeholder="admin/user" />
						<Password
							name="password"
							placeholder="888888/123456"
							onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
						/>
					</Tab>
					<Tab key="mobile" tab="手机号登录">
						<Mobile name="mobile" />
						<Captcha name="captcha" countDown={120} onGetCaptcha={this.onGetCaptcha} />
					</Tab>

					<div>
						<Checkbox>
							自动登录
						</Checkbox>
						<Link to={'/'} className="rt">忘记密码</Link>
					</div>
					<Submit loading={submitting}>登录</Submit>

					<div className="other">
						其他登录方式
						<Icon className={styles.icon} type="alipay-circle" />
						<Icon className={styles.icon} type="taobao-circle" />
						<Icon className={styles.icon} type="weibo-circle" />
						<Link className="register rt" to="/User/Register">
							注册账户
						</Link>
					</div>
				</Login>

			</div>
		);
	}
}

export default withRouter(LoginPage);