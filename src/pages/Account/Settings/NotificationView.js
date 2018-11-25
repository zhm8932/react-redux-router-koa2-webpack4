import React,{Component,Fragment} from 'react';
import {List,Radio,Switch,Icon} from 'antd'

export default class NotificationView extends Component{
	getData(){
		const Action = <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />;
		return [
			{
				title:'账户密码',
				description:'其他用户的消息将以站内信的形式通知',
				actions:[Action]
			},
			{
				title:'系统消息',
				description:'系统消息将以站内信的形式通知',
				actions:[Action]
			},
			{
				title:'支付密码',
				description:'支付密码消息将以站内信的形式通知',
				actions:[Action]
			}
		]
	}
	render(){
		return (
			<List
				dataSource={this.getData()}
				renderItem={item=>(
					<List.Item actions={item.actions}>
						<List.Item.Meta
							title={item.title}
							description={item.description}
						/>
					</List.Item>
				)}
			/>
		)
	}
}