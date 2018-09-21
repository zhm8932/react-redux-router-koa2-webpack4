import React, {Component } from 'react'

import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'

const {SubMenu} = Menu;
import Menus from '../../layouts/Menus';

export default class BaseMenu extends Component{
	constructor(props){
		super(props)
	}
	/**
	 * 判断是否是http链接.返回 Link 或 a
	 * @memberof SiderMenu
	 */
	getMenuItemPath = item =>{
		let name = item.name;
		const itemPath = this.conversionPath(item.path);
		const {icon,target} = item;

		if(/^https?\/\//.test(itemPath)){
			return (
				<a href={itemPath} target={target}>
					<span>{name}</span>
				</a>
			)
		}
		const {location} = this.props;
		return (
			<Link>
				{icon}
				<span>{name}</span>
			</Link>
		)
	}
	conversionPath = path => {
		if (path && path.indexOf('http') === 0) {
			return path;
		}
		return `/${path || ''}`.replace(/\/+/g, '/');
	};
	/**
	 * get SubMenu or Item
	 */
	getSubMenuOrItem = item =>{
		if(item.children&&!item.hideChildrenInMenu&&item.children.some(child=>child.name)){
			const name = item.local;
			return (
				<SubMenu key = {item.path}>
					{this.getNavMenuItems(item.children)}
				</SubMenu>
			)
		}
		return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
	}
	/**
	 * 获得菜单子节点
	 * @memberof SiderMenu
	 */
	getNavMenuItems(menusData, parent){
		if(!menusData){
			return []
		}
		return menusData
			.filter(item=>item.name&&!item.hideInMenu)
			.map(item=>{
				const ItemDom = this.getSubMenuOrItem(item,parent);
				return this.checkPermissionItem(item.authroity,ItemDom)
			})
	}
	checkPermissionItem = (authority,ItemDom)=>{
		const {Authorized} = this.props;
		if(Authorized&&Authorized.check){
			const {check} = Authorized;
			return check(authority,ItemDom)
		}
		return ItemDom
	}

	handleClick = (e) => {
		console.log('click ', e);
		this.setState({
			current: e.key,
		});
	}

	render(){
		const  {handleOpenChange,menuData} = this.props;
		return (
			<Menus/>
			/*<Menu key="Menu">
				{/!*{this.getNavMenuItems(menuData)}*!/}
			</Menu>*/
		)
	}
}