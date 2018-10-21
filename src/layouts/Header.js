import React,{ PureComponent } from 'react';
import {Link, NavLink} from "react-router-dom";
import { connect } from 'react-redux'
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from "../components/GlobalFooter";

class Header extends PureComponent{
	state={
		visible:true
	}
	static getDerivedStateFromProps(props,state){
		if(!state.visible){
			return {
				visible: true
			}
		}
		return null;
	}
	handleMenuClick = ()=>{

	}
	render(){
		const {handleMenuCollapse} = this.props;
		return (
			<GlobalHeader
				onCollapse = {handleMenuCollapse}
				onMenuClick = {this.handleMenuClick}
				{...this.props}
			/>
		)
	}
}

export default connect(({collapsed})=>({
	collapsed: global.collapsed,
}))(Header)