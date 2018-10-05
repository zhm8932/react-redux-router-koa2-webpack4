import React,{Component} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import './index.scss';

export default class FooterToolbar extends Component{
	state ={
		width:undefined
	};
	render(){
		const {children,className,extra,...restProps} = this.props;
		const {width} = this.state;
		return (
			<div className={classNames(className,'footer-toolbar')} {...restProps}>
				<div className='left'>{extra}</div>
				<div className='right'>{children}</div>
			</div>
		)
	}
}