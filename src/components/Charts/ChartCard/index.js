import React,{PureComponent} from 'react';
import {Card, Icon, Tooltip} from 'antd';
import classNames from 'classnames';

import './index.scss';
export default class ChartCard extends PureComponent{
	renderTotal(total){
		let totalDom;
		switch (typeof total) {
			case 'undefined':
				totalDom = null;
				break;
			case 'function':
				totalDom = <div className='total'>{total()}</div>
				break;
			default:
				totalDom = <div className="total">{total}</div>
		}
	}
	render(){
		const {
			loading=false,
			contentHeight,
			title,
			avatar,
			action,
			total,
			footer,
			children,
			...rest
		} = this.props

		if(loading){
			return false
		}
		return (
			<Card loading={loading} bodyStyle={{padding:'20px 24px 8px 24px'}} {...rest}>
				<div className="chartCard">
					<div className="chartTop">
						<div className="avatar">{avatar}</div>
						<div className="metaWrap">
							<div className="meta">
								<span className="title">{title}</span>
								<span className="action">{action}</span>
							</div>
							{this.renderTotal(total)}
						</div>
					</div>
					{children&&(<div className="content">{children}</div>)}
					{footer&&(<div className={classNames('footer',{
						footerMargin:!children
					})}>{footer}</div>)}
				</div>
			</Card>
		)
	}
}