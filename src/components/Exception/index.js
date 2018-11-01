import React,{PureComponent,createElement} from 'react';
import {Button} from 'antd';
import classNames from 'classnames'
import config from './typeConfig';
import './index.scss';

export default class Exception extends PureComponent{
	static defaultProps={
		backText:'back to home'
	}
	constructor(props){
		super(props)
	}
	render(){
		const {
			className,
			backText,
			linkElement = 'a',
			type,
			title,
			desc,
			img,
			actions,
			...rest
		} = this.props;
		const clsString = classNames('exception',className);
		const pageType = type in config?type:'404';
		return (
			<div className={clsString}>
				<div className='imgBlock'>
					<div className='imgEle'
						style={{backgroundImage:`url(${img||config[pageType].img})`}}
					/>
				</div>
				<div className='content'>
					<h2>{title||config[pageType].title}</h2>
					<div className='desc'>
						{desc||config[pageType].desc}
					</div>
					<div className='actions'>
						{actions||
							createElement(
								linkElement,
								{
									to:'/',
									href:'/'
								},
								<Button type='primary'>{backText}</Button>
							)
						}
					</div>
				</div>
			</div>
		)
	}
}


















