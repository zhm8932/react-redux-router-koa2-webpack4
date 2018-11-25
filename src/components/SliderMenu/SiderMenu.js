import React,{ PureComponent }  from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import BaseMenu,{getMenuMatches} from './BaseMenu';
import classNames from 'classnames'
import pathToRegexp from 'path-to-regexp';
import {urlToList} from '../../utils'

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menu
 */
export const getFlatMenuKeys = menu =>
	menu.reduce((keys, item) => {
		keys.push(item.path);
		if (item.children) {
			return keys.concat(getFlatMenuKeys(item.children));
		}
		return keys;
	}, []);

/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys, paths) =>{
	console.log("flatMenuKeys::",flatMenuKeys)
	paths.reduce(
		(matchKeys, path) =>
			matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
		[]
	);
}


/**
 * 获得菜单子节点
 * @memberof SiderMenu
 */
const getDefaultCollapsedSubMenus = props => {

	console.log("getDefaultCollapsedSubMenus---props:",props)

	const {
		location: { pathname },
		flatMenuKeys,
	} = props;
	return urlToList(pathname)
	.map(item => getMenuMatches(flatMenuKeys, item)[0])
	.filter(item => item);
};

export default class SiderMenu extends PureComponent{
	constructor(props){
		super(props);

		this.flatMenuKeys = getFlatMenuKeys(props.menuData);
		const {
			location: { pathname },
		} = props;

		this.state = {
			openKeys: getDefaultCollapsedSubMenus(props),
		};
	}
	static getDerivedStateFromProps(props, state) {
		const { pathname } = state;
		if (props.location.pathname !== pathname) {
			return {
				pathname: props.location.pathname,
				openKeys: getDefaultCollapsedSubMenus(props),
			};
		}
		return null;
	}
	handleOpenChange = openKeys =>{
		console.log("handleOpenChange---openKeys:",openKeys)
		this.setState({
			openKeys: [...openKeys],
		})
	}
	render(){
		const {collapsed} = this.props;
		const { openKeys } = this.state;
		const defaultProps = collapsed ? {} : { openKeys }
		return (
			<div className="header layout-sider">
				<div className="logo">
					<Link to='/' title="首页">首页</Link>
				</div>
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