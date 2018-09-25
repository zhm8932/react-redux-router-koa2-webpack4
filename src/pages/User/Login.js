import React,{Component} from 'react';
import { Checkbox, Alert, Icon ,Tabs,Button,Row, Col,Affix} from 'antd';
import {Link} from 'react-router-dom';
import Login from '../../components/Login';
import styles from './login.scss';

const TabPane = Tabs.TabPane;
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

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
			this.loginForm.validateFields(['mobile'], {}, (err, values) => {
				if (err) {
					reject(err);
				} else {
					const { dispatch } = this.props;
					dispatch({
						type: 'login/getCaptcha',
						payload: values.mobile,
					})
						.then(resolve)
						.catch(reject);
				}
			});
		});

	handleSubmit = (err, values) => {
		const { type } = this.state;
		if (!err) {
			const { dispatch } = this.props;
			dispatch({
				type: 'login/login',
				payload: {
					...values,
					type,
				},
			});
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
		return (
			<div className="main">
				<Affix offsetTop={this.state.top}>
					<Button
						type="primary"
					>
						Affix top
					</Button>
				</Affix>

				<Button type="primary" block>Primary</Button>
				<Button block>Default</Button>
				<Button type="dashed" block>Dashed</Button>
				<Button type="danger" block>danger</Button>
				<Tabs defaultActiveKey="1">
					<TabPane tab="Tab 1" key="1">Content2 of Tab Pane 1</TabPane>
					<TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
					<TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
				</Tabs>,

				<Icon type="star" theme="filled" />
				<Tab key="account" tab="账户密码登录">
					<UserName name="userName" placeholder="admin/user" />
					<Password
						name="password"
						placeholder="888888/123456"
						onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
					/>
				</Tab>
				<Tab key="mobile" tab="手机号登录">
					<p>手机号码登录</p>
				</Tab>

				<div>
					56666666666666666
					<div>
						<Row gutter={16}>
							<Col className="gutter-row" span={6}>
								<div className="gutter-box">col-6</div>
							</Col>
							<Col className="gutter-row" span={6}>
								<div className="gutter-box">col-6</div>
							</Col>
							<Col className="gutter-row" span={6}>
								<div className="gutter-box">col-6</div>
							</Col>
							<Col className="gutter-row" span={6}>
								<div className="gutter-box">col-6</div>
							</Col>
						</Row>
					</div>
					<div>
						<Checkbox>
							自动登录
						</Checkbox>
						<a style={{ float: 'right' }} href="">
							忘记密码
						</a>
					</div>

				</div>

			</div>
		);
	}
}

export default LoginPage;