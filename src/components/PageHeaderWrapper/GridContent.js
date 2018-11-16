import React,{PureComponent} from 'react';

import {connect} from 'react-redux';
import './GridContent.scss'
@connect(({setting})=>({
	contentWidth:setting.setting.contentWidth
}))
class GridContent extends PureComponent{
	render(){
		const {contentWidth,children} = this.props
		let className = 'main';
		if(contentWidth === 'Fixed'){
			className = 'main wide'
		}
		return <div className={className}>{children}</div>
	}
}

export default GridContent