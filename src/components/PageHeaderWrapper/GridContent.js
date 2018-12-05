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
		},className)
		return <div className={clsString}>{children}</div>
	}
}

export default GridContent