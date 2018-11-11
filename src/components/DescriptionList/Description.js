import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Col } from 'antd';
import responsive from './responsive';
import './index.scss';

const Description = ({term, column, className , children, ...restProps})=>{
	const clsString = classNames('description',className);
	return (
		<Col className={clsString} {...responsive[column]} {...restProps}>
			{term && <div className='term'>{term}</div>}
			{children !==null && children !==undefined && <div className='detail'>{children}</div>}
		</Col>
	)
}
Description.defaultProps = {
	term : ''
};

Description.propTyes = {
	term:PropTypes.node
};

export default Description
