import React, {Component } from 'react'

import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'

// const {SubMenu,MenuItemGroup} = Menu;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import Menus from '../../layouts/Menus';

const getIcon = icon => {
	if (typeof icon === 'string' && icon.indexOf('http') === 0) {
		return <img src={icon} alt="icon" className={styles.icon} />;
	}
	if (typeof icon === 'string') {
		return <Icon type={icon} />;
	}
	return icon;
};
export default class BaseMenu extends Component{
	constructor(props){
		super(props)
	}
	/**
	 * 判断是否是http链接.返回 Link 或 a
	 * @memberof SiderMenu
	 */
	getMenuItemPath = item =>{
		// let name = item.name;
		const name = <FormattedMessage id={item.locale} />;
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
			<Link
				to={itemPath}
				target={target}
				replace={itemPath === location.pathname}
			>
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
			// const name = item.local;
			const name = <FormattedMessage id={item.locale} />;
			// console.log("getSubMenuOrItem--item:::",item,"item.locale:",item.locale,"name:::",name)
			console.log("item.locale:",item.locale,"name:::",name)
			return (
				<SubMenu
					key = {item.path}
					title={
						item.icon?(
							<span>
								<span>{getIcon(item.icon)}</span>
								<span>{name}</span>
							</span>
						):(
							{name}
						)
					}
				>
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
		{/*<Menus/>*/}
		const  {handleOpenChange,menuData,theme,mode='inline'} = this.props;
		return (
			<Menu
				theme={theme}
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				mode={mode}
			>
				{this.getNavMenuItems(menuData)}
			</Menu>
		)
	}
}