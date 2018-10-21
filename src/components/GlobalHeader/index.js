import React, {PureComponent} from 'react'
import { Icon ,Button} from 'antd';
import { Link} from 'react-router-dom';
// import RightContent from './RightContent'
import './style.scss';

export default class GlobalHeader extends PureComponent{
	toggle = ()=>{
		const {collapsed,onCollapse} = this.props;

		onCollapse&&onCollapse(!collapsed)
	}
	render(){
		const { collapsed } = this.props;

		return(
			<div className="header layout-header">
				<Icon
					className='trigger'
					type={collapsed?'menu-unfold' : 'menu-fold'}
					onClick={this.toggle}
				/>
				<div className="header-right">
					<Link exact to='/login'>登陆</Link>
				</div>
			</div>
		)
	}
}