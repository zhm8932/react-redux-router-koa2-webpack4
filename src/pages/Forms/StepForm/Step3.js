import React,{PureComponent,Fragment} from 'react';

import {connect} from 'react-redux';
import {Form,Row,Col,Button,Select,Divider} from 'antd';

import Result from '../../../components/Result';

import '../style.scss';

@connect(({form})=>({
	data:form.step
}))

@Form.create()
export default class Step3 extends PureComponent{
	onFinish=()=>{
		console.log("this:",this)
		const {history} = this.props;

		history.push('/form/step-form/info')
	}
	render(){
		const {data} = this.props;
		const information = (
			<div className="information">
				<Row>
					<Col xs={24} sm={8}>付款账户：</Col>
					<Col xs={24} sm={16}>{data.payAccount}</Col>
				</Row>
				<Row>
					<Col xs={24} sm={8}>收款账户：</Col>
					<Col xs={24} sm={16}>{data.receiverAccount}</Col>
				</Row>
				<Row>
					<Col xs={24} sm={8}>收款人姓名：</Col>
					<Col xs={24} sm={16}>{data.receiverName}</Col>
				</Row>
				<Row>
					<Col xs={24} sm={8}>转账金额：</Col>
					<Col xs={24} sm={16}>
						<span className='money'>{data.amount}</span>元
					</Col>
				</Row>
			</div>
		)
		const actions = (
			<Fragment>
				<Button type='primary' onClick={this.onFinish}>
					再转一笔
				</Button>
				<Button>查看账单</Button>
			</Fragment>
		)
		return (
			<Result
				type='success'
				title='第三步'
				description='预计两小时内到账'
				actions={actions}
				extra={information}
				className='result-wrapper'
			/>
		)
	}
}











