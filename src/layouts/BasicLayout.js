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
	}
	state = {
		rendering:true
	}
	getContext(){
		const  {location} = this.props
		return {
			location
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
		console.log("children:",children)
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
				{this.layout()}
			</DocumentTitle>
		)
	}
}

export default BasicLayout