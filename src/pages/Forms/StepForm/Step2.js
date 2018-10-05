import React,{PureComponent,Fragment,} from 'react';

import {connect} from 'react-redux';
import {Form,Input,Button,Select,Divider,message,Alert} from 'antd';
import {digitUppercase} from '../../../utils';
import '../style.scss';


const formItemLayout={
	labelCol	:	{span:5},
	wrapperCol	:	{span:9}
}

@connect(({form})=>({
	data:form.step
}))

@Form.create()
export default class Step2 extends PureComponent{
	onPrev=()=>{
		const {history} = this.props;
		history.push('/form/step-form/info')
	}
	render(){
		const {form,data,dispatch,submitting,history} = this.props;
		const {getFieldDecorator,validateFields} = form;

		const onValidateForm = e =>{
			e.preventDefault();
			validateFields((err,values)=>{
				if(!err){
					history.push('/form/step-form/result')
				}
			})
		}
		return (
			<Form className='stepForm' hideRequiredMark>
				<Alert
					closable
					showIcon
					message="确认转账后，资金将直接打入对方账户，无法退回."
					style={{marginBottom:24}}

				/>
				<Form.Item {...formItemLayout} label="付款账户">
					{data.payAccount}
				</Form.Item>
				<Form.Item {...formItemLayout} className='stepFormText' label="收款账户">
					{data.receiverAccount}
				</Form.Item>
				<Form.Item {...formItemLayout} className='stepFormText' label="收款账户">
					{data.receiverName}
				</Form.Item>
				<Form.Item {...formItemLayout} className='stepFormText' label="转账金额">
					<span className='money'>{data.amount}</span>
					<span className='uppercase'>（{digitUppercase(data.amount)}）</span>
				</Form.Item>
				<Divider/>
				<Form.Item {...formItemLayout} label="支付密码">
					{getFieldDecorator('password',{
						initialValue:'123456',
						rules:[
							{
								required:true,
								message:'需要支付密码才能进行支付'
							},{
								min:6,
								message:'密码不少于6位'
							}
						]
					})(<Input type='password' autoComplete='off'/>)}
				</Form.Item>
				<Form.Item
					wrapperCol={{
						xs:{span:24,offset:0},
						sm:{
							span:formItemLayout.wrapperCol.span,
							offset:formItemLayout.labelCol.span
						}
					}}
				>
					<Button type='primary' onClick={onValidateForm}>
						提交
					</Button>
					<Button onClick={this.onPrev} style={{marginLeft:8}}>
						上一步
					</Button>
				</Form.Item>
			</Form>
		)
	}
}












