import React, {PureComponent} from 'react'
import { Icon ,Button} from 'antd';
import { Link} from 'react-router-dom';
// import RightContent from './RightContent'

export default class GlobalHeader extends PureComponent{
	toggle = ()=>{

	}
	render(){
		return(
			<div className="header layout-header">
				头部
				<div className="header-right">
					<Link exact to='/login'>登陆</Link>
				</div>
			</div>
		)
	}
}