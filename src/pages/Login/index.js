import React,{Component} from 'react';

import './login.scss'


export default class Login extends Component {
	render(){
		console.log("props:",this.props)
		console.log("登陆页")
		return (
			<div className="login form">
				<div className="panel-header">欢迎登陆</div>
				<ul>
					<li>
						<label className="justify">用户名:</label>
						<input type="text" placeholder="请输入用户名"/>
					</li>
					<li>
						<label className="justify">密码:</label>
						<input type="password" placeholder="请输入密码"/>
					</li>
					<div className="submit-box">
						<button className="btn submit-btn">登陆</button>
					</div>
				</ul>
			</div>
		)
	}
}