import React from 'React';
import classNames from 'classnames';
import DocumentTitle from 'react-document-title';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'react-redux'

import SiderMenu from '../components/SliderMenu';
import GlobalHeader from '../components/GlobalHeader';
import Header from './Header';
import Footer from './Footer';
import Context from './MenuContext';
import {change_collapsed} from '../redux/globalRedux'

// Conversion router to menu.
function formatter(data, parentPath = '', parentAuthority, parentName) {
	return data.map(item => {
		let locale = 'menu';
		if (parentName && item.name) {
			locale = `${parentName}.${item.name}`;
		} else if (item.name) {
			locale = `menu.${item.name}`;
		} else if (parentName) {
			locale = parentName;
		}
		console.log("local:",locale)
		const result = {
			...item,
			locale,
			authority: item.authority || parentAuthority,
		};
		if (item.routes) {
			const children = formatter(item.routes, `${parentPath}${item.path}/`, item.authority, locale);
			// Reduce memory usage
			result.children = children;
		}
		delete result.routes;
		return result;
	});
}

class BasicLayout extends React.PureComponent{
	constructor(props){
		super(props)
		this.state = {
			rendering:true
		}
		this.breadcrumbNameMap = this.getBreadcrumbNameMap();
	}
	/**
	 * 获取面包屑映射
	 * @param {Object} menuData 菜单配置
	 */
	getBreadcrumbNameMap() {
		const routerMap = {};
		const mergeMenuAndRouter = data => {
			console.log("menuItem.data:",data)
			data.forEach(menuItem => {
				console.log("menuItem.children:",menuItem.children,"menuItem::",menuItem)
				if (menuItem.children) {
					mergeMenuAndRouter(menuItem.children);
				}
				// Reduce memory usage
				routerMap[menuItem.path] = menuItem;
			});
		};
		mergeMenuAndRouter(this.getMenuData());
		console.log("routerMap:",routerMap,"getMenuData:",this.getMenuData())
		return routerMap;
	}
	getContext(){
		const  {location} = this.props;
		console.log("location:::",location,"breadcrumbNameMap-context:::",this.breadcrumbNameMap)
		return {
			location,
			breadcrumbNameMap: this.breadcrumbNameMap,
		}
	}
	getMenuData (){
		const {
			route:{routes}
		} = this.props;
		return formatter(routes)||{}
	}
	getPageTitle = pathname =>{
		let currRouterData = null;
		if (!currRouterData) {
			return 'React Admin';
		}
		const message = currRouterData.name;
		return `${message} - Admin`
	}
	handleMenuCollapse = collapsed=>{
		const {dispatch} = this.props;
		dispatch(change_collapsed())
	}
	layout(){
		const {
			navTheme='dark',
			children,
			// location:{pathname},
		} = this.props;
		const {rendering} = this.state;
		const menuData = this.getMenuData();
		// const menuData = [];

		const layout = (
			<React.Fragment>
				<SiderMenu
					menuData={menuData}
					theme={navTheme}
					{...this.props}
				/>
				<section className="layout">
					{/*<GlobalHeader
						onCollapse={this.handleMenuCollapse}
						{...this.props}
					/>*/}
					<Header
						handleMenuCollapse = {this.handleMenuCollapse}
						{...this.props}
					/>
					<div className="layout-content">
						{children}
					</div>
					<Footer {...this.props}/>
				</section>
			</React.Fragment>

		)
		return layout
	}
	render(){
		return (
			<DocumentTitle>
				<Context.Provider value={this.getContext()}>
					{this.layout()}
				</Context.Provider>

			</DocumentTitle>
		)
	}
}

export default connect(({global})=>({
	collapsed:global.collapsed
}))(BasicLayout)