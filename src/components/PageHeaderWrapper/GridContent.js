import React,{PureComponent} from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import './GridContent.scss'
@connect(({setting})=>({
	contentWidth:setting.setting.contentWidth
}))
class GridContent extends PureComponent{
	render(){
		const {contentWidth,children,className} = this.props
		let clsString = classNames('main',{
			wide:contentWidth==='Fixed'?'wide':'',
			className:className||''
		})
		return <div className={className}>{children}</div>
	}
}

export default GridContent