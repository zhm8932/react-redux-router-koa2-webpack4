import React,{PureComponent} from 'react';
import { Spin, Tag, Menu, Icon, Dropdown, Avatar, Tooltip, Button } from 'antd';

export default class GlobalHeaderRight extends PureComponent{

	render(){
		const {currentUser={},onMenuClick} = this.props;

		const menu = (
			<Menu className="menu" selectedKeys={[]} onClick={onMenuClick}>
				<Menu.Item key="userCenter">
					<Icon type="user" />
					<span>个人中心</span>
				</Menu.Item>
				<Menu.Item key="userinfo">
					<Icon type="setting" />
					<span>个人设置</span>
				</Menu.Item>
				<Menu.Item key="triggerError">
					<Icon type="close-circle" />
					<span>触发报错</span>
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item key="logout">
					<Icon type="logout" />
					退出登录
				</Menu.Item>
			</Menu>
		);
		return (
			<div className="header-right">
				<Tooltip title="使用文档">
					<a
						target="_blank"
						href="https://pro.ant.design/docs/getting-started"
						rel="noopener noreferrer"
						className="action"
						title="使用文档"
					>
						<Icon type="question-circle-o" />
					</a>
				</Tooltip>
				{currentUser.name ? (
					<div>22222</div>
					) : (
						<Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
					)
				}
			</div>
		)
	}
}
