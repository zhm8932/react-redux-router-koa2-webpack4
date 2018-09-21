import React,{ PureComponent } from 'react';
import {Link, NavLink} from "react-router-dom";

class HeaderView extends PureComponent{
	state = {
		visible:true
	};
	static getDerivedStateFromProps(props,state){
		if(!props.autoHideHeader&&!state.visible){
			return{
				visible: true
			}
		}
	}
	componentDidMount(){
		document.addEventListener('scroll',this.handleScroll,{passive:true})
	}
	componentWillUnmount(){
		document.removeEventListener('scroll',this.handleScroll)
	}
	handleScroll=()=>{
		const { autoHideHeader } = this.props;
		const { visible } = this.state;

	}
	render(){
		return(
			<div className="layout-sider">
				<div className="menu clearfix">
					<ul className="menu-root">
						<li className="submenu" activeClassName="menu-sub-selected">
							<div className="submenu-title">
								<i className="iconfont icon-dashboard"></i>
								<span>Dashboard</span>
								<i className="iconfont icon-arrow-bottom"></i>
							</div>
							<ul className="menu-sub">
								<li className="menu-item"><span><NavLink exact to="/" activeClassName="selected">首页</NavLink></span></li>
								<li className="menu-item"><span><NavLink exact to="/news" activeClassName="selected">企业动态</NavLink></span></li>
								<li className="menu-item">
									<NavLink to='/dashboard/analysis' activeClassName="selected"><span>分析页</span></NavLink>
								</li>
								<li className="menu-item">
									<NavLink to="/dashboard/monitor" activeClassName="selected"><span>监控台</span></NavLink>
								</li>
								<li className="menu-item">
									<NavLink to="/dashboard/workplace" activeClassName="selected"><span>工作台</span></NavLink>
								</li>
							</ul>
						</li>
						<li className="submenu" activeClassName="menu-sub-selected">
							<div className="submenu-title">
								<i className="iconfont icon-form"></i>
								<span>表单页</span>
								<i className="iconfont icon-arrow-bottom"></i>
							</div>
							<ul className="menu-sub">
								<li className="menu-item">
									<NavLink to='/dashboard/analysis'><span>基础表单</span></NavLink>
								</li>
								<li className="menu-item">
									<NavLink to="/dashboard/monitor"><span>分布表单</span></NavLink>
								</li>
								<li className="menu-item">
									<NavLink to="/dashboard/workplace"><span>高级表单</span></NavLink>
								</li>
							</ul>
						</li>
						<li className="submenu">
							<div className="submenu-title">
								<i className="iconfont icon-table"></i>
								<span>列表页</span>
								<i className="iconfont icon-arrow-bottom"></i>
							</div>
							<ul className="menu-sub">
								<li className="menu-item">
									<NavLink to='/dashboard/analysis'><span>查询表格</span></NavLink>
								</li>
								<li className="menu-item">
									<NavLink to="/dashboard/monitor"><span>标准列表</span></NavLink>
								</li>
								<li className="menu-item">
									<NavLink to="/dashboard/workplace"><span>卡片列表</span></NavLink>
								</li>
								<li className="menu-item">
									<NavLink to="/dashboard/workplace"><span>搜索列表</span></NavLink>
								</li>
							</ul>
						</li>
						<li className="submenu">
							<div className="submenu-title">
								<i className="iconfont icon-zhushi"></i>
								<span>详情页</span>
								<i className="iconfont icon-arrow-bottom"></i>
							</div>
							<ul className="menu-sub">
								<li className="menu-item">
									<NavLink to='/dashboard/analysis'><span>基础详情页</span></NavLink>
								</li>
								<li className="menu-item">
									<NavLink to="/dashboard/monitor"><span>高级详情页</span></NavLink>
								</li>
							</ul>
						</li>
						<li className="submenu">
							<div className="submenu-title">
								<i className="iconfont icon-users"></i>
								<span>个人页</span>
								<i className="iconfont icon-arrow-bottom"></i>
							</div>
							<ul className="menu-sub">
								<li className="menu-item">
									<NavLink to='/dashboard/analysis'><span>个人中心</span></NavLink>
								</li>
								<li className="menu-item">
									<NavLink to="/dashboard/monitor"><span>个人设置</span></NavLink>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		)
	}

}

export default HeaderView;