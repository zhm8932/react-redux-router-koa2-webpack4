import React,{Component,Fragment} from 'react';
import {Icon,List} from 'antd';
import './index.scss'

export default class BindingView extends Component{
	getData(){
		return [
			{
				title:'绑定淘宝',
				description:'当前未绑定淘宝账号',
				actions:[<a>绑定</a>],
				avatar:<Icon type='taobao' className='icons taobao'/>
			},
			{
				title:'绑定支付宝',
				description:'当前未绑定支付宝账号',
				actions:[<a>绑定</a>],
				avatar: <Icon type="alipay" className='icons alipay'/>
			},
			{
				title:'绑定钉钉',
				description:'当前未绑定钉钉账号',
				actions:[<a>绑定</a>],
				avatar:<Icon type="dingding" className="icons dingding" />
			},
			{
				title:'绑定苹果',
				description:'当前未绑定苹果账号',
				actions:[<a>绑定</a>],
				avatar:<Icon type="windows" className="icons apple"  />
			},
			{
				title:'绑定苹果',
				description:'当前未绑定苹果账号',
				actions:[<a>绑定</a>],
				avatar:<Icon type="github" className="icons github" />
			},
			{
				title:'绑定微博',
				description:'当前未绑定微博账号',
				actions:[<a>绑定</a>],
				avatar:<Icon type="weibo" className="icons weibo"  />
			},
			{
				title:'绑定微信',
				description:'当前未绑定微信账号',
				actions:[<a>绑定</a>],
				avatar:<Icon type="wechat" className="icons wechat"  />
			},
			{
				title:'绑定QQ',
				description:'当前未绑定QQ账号',
				actions:[<a>绑定</a>],
				avatar:<Icon type="qq" className="icons qq" />
			},
			{
				title:'绑定知乎',
				description:'当前未绑定知乎账号',
				actions:[<a>绑定</a>],
				avatar:<Icon type="zhihu" className="icons zhihu" />
			},
		]
	}
	render(){
		return (
			<Fragment>
				<List
					className='binding-list'
					dataSource={this.getData()}
					renderItem={item=>(
						<List.Item actions={item.actions}>
							<List.Item.Meta
								avatar={item.avatar}
								title={item.title}
								description={item.description}
							/>
						</List.Item>
					)}
				/>
			</Fragment>
		)
	}
}