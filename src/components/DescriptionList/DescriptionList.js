import React from 'react';
import classNames from 'classnames';
import { Row } from 'antd';
import './index.scss';

const DescriptionList = ({
	className,
	title,
	gutter = 32,
	col = 3,
	layout = 'horizontal',
	children,
	size,
	...restProps
})=>{
	const clsString = classNames('descriptionList',className,{
		'small': size==='small',
		'large': size==='large'
	});
	const column = col > 4 ? 4 : col;
	return (
		<div className={clsString} {...restProps}>
			{title?<div className='title'>{title}</div>:null}
			<Row gutter={gutter}>
				{React.Children.map(
					children,
					child=>(child ? React.cloneElement(child, {column}) : child)
				)}
			</Row>
		</div>
	)
}



export default DescriptionList