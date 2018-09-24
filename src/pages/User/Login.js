import React,{Component} from 'react';
import { Checkbox, Alert, Icon ,Tabs,Button} from 'antd';
import {Link} from 'react-router-dom';
import Login from '../../components/Login';
import styles from './login.scss';

const TabPane = Tabs.TabPane;
// const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class LoginPage extends Component {
	state = {
		type: 'account',
		autoLogin: true,
	};

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
				<Button type="primary" block>Primary</Button>
				<Button block>Default</Button>
				<Button type="dashed" block>Dashed</Button>
				<Button type="danger" block>danger</Button>
				<div>
					56666666666666666
					{/*<Tabs type="card">
						<TabPane tab="Tab Title 1" key="1">
							<p>Content of Tab Pane 1</p>
							<p>Content of Tab Pane 1</p>
							<p>Content of Tab Pane 1</p>
						</TabPane>
						<TabPane tab="Tab Title 2" key="2">
							<p>Content of Tab Pane 2</p>
							<p>Content of Tab Pane 2</p>
							<p>Content of Tab Pane 2</p>
						</TabPane>
					</Tabs>*/}
				</div>

			</div>
		);
	}
}

export default LoginPage;