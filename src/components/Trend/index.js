import {Icon} from 'antd';
import classNames from 'classnames';

import './index.scss'
const Trend = ({colorful = true,reverseColor=false, flag,children,className,...rest}) => {
	const clsString = classNames(
		'trendItem',
		{
			trendItemGrey:!colorful,
			reverseColor:reverseColor&&colorful
		},
		className
	)
	return (
		<div {...rest} className={clsString} title={typeof children === 'string' ? children :''}>
			<span className='value'>{children}</span>
			{flag&&(
				<span className={flag}>
					<Icon type={`caret-${flag}`} />
				</span>
			)}
		</div>
	)
}
export default Trend

