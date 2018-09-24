import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';

import logo from '../images/logo.png';
const copyright =(
	<Fragment>
		Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
	</Fragment>
)

class UserLayout extends React.PureComponent{
	render(){
		const {children} = this.props;
		return (
			<div className="container">
				<div className="content">
					<div className="top">
						<div className="header">
							<div className="logo">
								<Link to='/'>
									logo
								</Link>
							</div>

						</div>
						<div className="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
					</div>
					{children}
				</div>
				<GlobalFooter copyright={copyright}/>
			</div>
		)
	}
}


export default UserLayout;