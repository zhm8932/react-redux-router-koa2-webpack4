import React, {PureComponent,createElement} from 'react';

import {Breadcrumb,Tabs,Skeleton} from 'antd';
import classNames from 'classnames';
import * as utils from '../../utils';
import pathToRegexp from 'path-to-regexp';

const {TabPane} = Tabs;
import './index.scss'

export const getBreadcrumb = (breadcrumbNameMap, url) => {
	let breadcrumb = breadcrumbNameMap[url];
	console.log("breadcrumb11111111:",breadcrumb,"url:",url,"breadcrumbNameMap：",breadcrumbNameMap)
	if (!breadcrumb) {
		Object.keys(breadcrumbNameMap).forEach(item => {

			if (pathToRegexp(item).test(url)) {
				breadcrumb = breadcrumbNameMap[item];
			}
		});
	}
	console.log("getbreadcrumb::",breadcrumb)
	return breadcrumb || {};
};

export default class PageHeader extends PureComponent{
	state = {
		breadcrumb:null,
	};
	componentDidMount() {
		this.getBreadcrumbDom();
	}
	componentDidUpdate(preProps){

	}
	getBreadcrumbProps = () => {
		const { routes, params, location, breadcrumbNameMap } = this.props;
		console.log("this.props::::",this.props)
		return {
			routes,
			params,
			routerLocation: location,
			breadcrumbNameMap,
		};
	};
	getBreadcrumbDom = ()=>{
		const breadcrumb = this.conversionBreadcrumbList();
		console.log("getBreadcrumbDom:",breadcrumb)
		this.setState({
			breadcrumb,
		});
	}
	conversionFromLocation = (routerLocation, breadcrumbNameMap) => {
		const { breadcrumbSeparator, home, itemRender, linkElement = 'a' } = this.props;
		// Convert the url to an array
		const pathSnippets = utils.urlToList(routerLocation.pathname);
		console.log("pathSnippets:::",pathSnippets)
		// Loop data mosaic routing
		const extraBreadcrumbItems = pathSnippets.map((url, index) => {
			const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
			console.log("currentBreadcrumb:",currentBreadcrumb)
			if (currentBreadcrumb.inherited) {
				return null;
			}
			const isLinkable = index !== pathSnippets.length - 1 && currentBreadcrumb.component;
			const name = itemRender ? itemRender(currentBreadcrumb) : currentBreadcrumb.name;
			return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
				<Breadcrumb.Item key={url}>
					{createElement(
						isLinkable ? linkElement : 'span',
						{ [linkElement === 'a' ? 'href' : 'to']: url },
						name
					)}
				</Breadcrumb.Item>
			) : null;
		});
		console.log("extraBreadcrumbItems::",extraBreadcrumbItems)
		// Add home breadcrumbs to your head
		extraBreadcrumbItems.unshift(
			<Breadcrumb.Item key="home">
				{createElement(
					linkElement,
					{
						[linkElement === 'a' ? 'href' : 'to']: '/',
					},
					home || 'Home'
				)}
			</Breadcrumb.Item>
		);
		return (
			<Breadcrumb className='breadcrumb' separator={breadcrumbSeparator}>
				{extraBreadcrumbItems}
			</Breadcrumb>
		);
	};
	/**
	 * 将参数转化为面包屑
	 * Convert parameters into breadcrumbs
	 */
	conversionBreadcrumbList = () => {
		const { breadcrumbList, breadcrumbSeparator } = this.props;
		const { routes, params, routerLocation, breadcrumbNameMap } = this.getBreadcrumbProps();
		if (breadcrumbList && breadcrumbList.length) {
			return this.conversionFromProps();
		}
		console.log("routes:",routes,"params:",params)
		// 如果传入 routes 和 params 属性
		// If pass routes and params attributes
		if (routes && params) {
			return (
				<Breadcrumb
					className='breadcrumb'
					routes={routes.filter(route => route.breadcrumbName)}
					params={params}
					itemRender={this.itemRender}
					separator={breadcrumbSeparator}
				/>
			);
		}
		console.log("routerLocation:",routerLocation,"breadcrumbNameMap:",breadcrumbNameMap)
		// 根据 location 生成 面包屑
		// Generate breadcrumbs based on location
		if (routerLocation && routerLocation.pathname) {
			return this.conversionFromLocation(routerLocation, breadcrumbNameMap);
		}
		return null;
	};
	// Generated according to props
	conversionFromProps = () => {
		const { breadcrumbList, breadcrumbSeparator, itemRender, linkElement = 'a' } = this.props;
		return (
			<Breadcrumb className='breadcrumb' separator={breadcrumbSeparator}>
				{breadcrumbList.map(item => {
					const title = itemRender ? itemRender(item) : item.title;
					return (
						<Breadcrumb.Item key={item.title}>
							{item.href
								? createElement(
									linkElement,
									{
										[linkElement === 'a' ? 'href' : 'to']: item.href,
									},
									title
								)
								: title}
						</Breadcrumb.Item>
					);
				})}
			</Breadcrumb>
		);
	};
	onChange = key => {
		const {onTabChange} = this.props;
		onTabChange&&onTabChange(key);
	}
	render(){
		const {
			title,
			logo,
			action,
			content,
			extraContent,
			tabList,
			className,
			tabActiveKey,
			tabDefaultActiveKey,
			tabBarExtraContent,
			loading = false,
			wide = false
		} = this.props;
		const {breadcrumb} = this.state;
		const clsString = classNames('pageHeader',className);
		const activeKeyProps = {};
		if(tabDefaultActiveKey!==undefined){
			activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
		}
		if(tabActiveKey!==undefined){
			activeKeyProps.activeKey = tabActiveKey;
		}
		console.log("breadcrumb--this.state:",this.state)
		console.log("breadcrumb--his.props:",this.props)
		console.log("breadcrumb:::",breadcrumb)
		return (
			<div className={clsString}>
				<div className={wide?'wide':''}>
					<Skeleton
						loading={loading}
						title={false}
						active
						paragraph={{rows:3}}
						avatar={{size:'large'}}
					>
						{breadcrumb}
						<div className='header-detail'>
							{logo&&<div className='logo'>{logo}</div>}
							<div className='header-main'>
								<div className="header-row">
									{title&&<h1 className='title'>{title}</h1>}
									{action&&<div className='action'>{action}</div>}
								</div>
								<div className="header-row">
									{content&&<div className='content'>{content}</div>}
									{extraContent&&<div className='extraContent'>{extraContent}</div>}
								</div>
							</div>
						</div>
						{ tabList&&tabList.length ? (
							<Tabs
								className='tabs'
								onChange={this.onChange}
							>
								{tabList.map(item=>(
									<TabPane key={item.key} tab={item.tab}/>
								))}
							</Tabs>
						) : null }

					</Skeleton>
				</div>
			</div>
		)
	}
}