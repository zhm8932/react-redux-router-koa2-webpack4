import React,{PureComponent} from 'react'
import {Card} from 'antd'
import PageHeaderWrapper from '../../components/PageHeaderWrapper'

export default class BasicProfile extends PureComponent{
	render(){
		return (
			<PageHeaderWrapper title='高级详情页'>
				<Card>
					<div>高级详情页页页面内容</div>
				</Card>
			</PageHeaderWrapper>
		)
	}
}