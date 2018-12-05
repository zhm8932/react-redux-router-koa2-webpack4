import React, {Component } from 'react'

import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'
import pathToRegexp from 'path-to-regexp';
import {urlToList} from '../../utils'

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

export const getMenuMatches = (flatMenuKeys, path) =>{
	console.log("flatMenuKeys::",flatMenuKeys)
	let menuKeys = flatMenuKeys.filter(item => item && pathToRegexp(item).test(path));
	console.log("menuKeys:::",menuKeys)
	return menuKeys
}


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
					<span data-local={item.locale}>{name}</span>
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
				<span data-locale={item.locale}>{name}</span>
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
		//有子菜单且 不在菜单中隐藏、且子类有name属性
		if(item.children&&!item.hideChildrenInMenu&&item.children.some(child=>child.name)){
			// const name = item.local;
			const name = <FormattedMessage id={item.locale} />;
			// console.log("getSubMenuOrItem--item:::",item)
			// console.log("item.locale:",item.locale,"name:::",name)
			return (
				<SubMenu
					key = {item.path}
					title={
						item.icon?(
							<span>
								<span>{getIcon(item.icon)}</span>
								<span data-local={item.locale}>{name}</span>
							</span>
						):(
							<em data-local={item.locale}>{name}</em>
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
			.filter(item=>item.name&&!item.hideInMenu)  //不在菜单中显示
			.map(item=>{
				const ItemDom = this.getSubMenuOrItem(item,parent);
				// console.log("item:",item,"ItemDom:::::",ItemDom)
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
	getSelectedMenuKeys =()=>{
		console.log("1111111111111111111111111")
		const {
			location:{pathname}
		} = this.props;
		console.log("getSelectedMenuKeys--pathname::::",pathname)
		console.log("urlToList::::",urlToList(pathname))
		return urlToList(pathname)
	}
	render(){

		const  {openKeys,handleOpenChange,menuData,theme,mode='inline'} = this.props;
		// let selectedKeys = ["/list", "/list/basic-list"]   //当前选中的菜单项 key 数组

		let selectedKeys = this.getSelectedMenuKeys()
		// const openKeys = ["/list", "/list/basic-list"]		//当前展开的 SubMenu 菜单项 key 数组
		console.log("selectedKeys:::",selectedKeys)
		console.log("openKeys:::",openKeys)
		// const openKeys = this.getSelectedMenuKeys();

		let props = {};
		if(openKeys){
			props = {
				openKeys
			}
		}

		return (
			<Menu
				theme={theme}
				onOpenChange={handleOpenChange}
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				mode={mode}
				selectedKeys={selectedKeys}
				{...props}
			>
				{this.getNavMenuItems(menuData)}
			</Menu>
		)
	}
}