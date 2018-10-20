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
			data.forEach(menuItem => {
				if (menuItem.children) {
					mergeMenuAndRouter(menuItem.children);
				}
				// Reduce memory usage
				routerMap[menuItem.path] = menuItem;
			});
		};
		mergeMenuAndRouter(this.getMenuData());
		return routerMap;
	}
	getContext(){
		const  {location} = this.props;
		console.log("location:::::",location)
		return {
			location,
			breadcrumbNameMap: this.breadcrumbNameMap,
		}
	}
	getMenuData (){
		const {
			route:{routes}
		} = this.props;
		return routes||{}
	}
	getPageTitle = pathname =>{
		let currRouterData = null;
		if (!currRouterData) {
			return 'React Admin';
		}
		const message = currRouterData.name;
		return `${message} - Admin`
	}
	layout(){
		const {
			children,
			// location:{pathname},
		} = this.props;
		const {rendering} = this.state;
		// const menuData = this.getMenuData();
		const menuData = [];

		const layout = (
			<React.Fragment>
				<SiderMenu

				/>
				<section className="layout">
					<GlobalHeader/>
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

export default BasicLayout