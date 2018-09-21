import React,{ PureComponent }  from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import BaseMenu from './BaseMenu';
import classNames from 'classnames'

export default class SiderMenu extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			openKeys:''
		}
	}
	handleOpenChange = openKeys =>{
		this.setState({
			openKeys:''
		})
	}
	render(){
		const {collapsed} = this.props;
		const { openKeys } = this.state;
		const defaultProps = collapsed ? {} : { openKeys }
		return (
			<div className="header layout-sider">
				<Link to='/' title="首页" className="logo">首页</Link>
				<BaseMenu
					{...this.props}
					handleOpenChange = {this.handleOpenChange}
					onOpenChange={this.handleOpenChange}
					{...defaultProps}
				/>
			</div>
		)
	}
}