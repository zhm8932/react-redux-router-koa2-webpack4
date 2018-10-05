import React,{PureComponent,Fragment} from 'react';

import {connect} from 'react-redux';
import {Form,Input,Button,Select,Divider,message} from 'antd';
const {Option} = Select;


import {handleStepSubmit} from '../../../redux/FormRedux';
const formItemLayout={
	labelCol	:	{span:5},
	wrapperCol	:	{span:19}
}

@connect(({form})=>({
	data:form.step
}))

@Form.create()
export default class Step1 extends PureComponent{
	render(){
		const {form,dispatch,data,history} = this.props;
		const {getFieldDecorator,validateFields} = form;
		console.log("this.props:",this.props,"data:",data)
		const onValidateForm = ()=>{
			validateFields((err,values)=>{
				if(!err){
					dispatch(handleStepSubmit({url:'/form',method:'POST',data:values}))
						.then(store=>{
							console.log("store----:",store)
							const payload = store;
							if(payload.success){
								message.success("账户信息提交成功")
								history.push('/form/step-form/confirm')
							}else{
								message.error("账户信息提交失败")
							}
						})
				}
			})
		}
		return (
			<Fragment>
				<Form className='stepForm' hideRequiredMark>
					<Form.Item {...formItemLayout} label="付款账户">
						{getFieldDecorator('payAccount',{
							initialValue:data.payAccount,
							rules:[{required:true,message:'请选择付款账户'}]
						})(
							<Select placeholder="test@example.com">
								<Option value="design@alipay.com">design@alipay.com</Option>
							</Select>
						)}
					</Form.Item>
					<Form.Item {...formItemLayout} label='收款账户'>
						<Input.Group compact>
							<Select defaultValue="alipay" style={{width:'100px'}}>
								<Option value='alipay'>支付宝</Option>
								<Option value='wechat'>微信</Option>
								<Option value='bank'>支付宝</Option>
							</Select>
							{getFieldDecorator('receiverAccount',{
								initialValue:data.receiverAccount,
								rules:[
									{required:true,message: '请输入收款人账户'},
									{type:'email',message:'账户名应为邮箱格式'}
								]
							})(<Input style={{width:'calc(100% - 100px)'}} placeholder="test@example.com"/>)}
						</Input.Group>
					</Form.Item>
					<Form.Item {...formItemLayout} label="收款人姓名">
						{getFieldDecorator('receiverName',{
							initialValue:data.receiverName,
							rules:[{required:true,message:'请输入收款人姓名'}]
						})(<Input placeholder='请输入收款人姓名'/>)}
					</Form.Item>
					<Form.Item {...formItemLayout} label='转账金额'>
						{getFieldDecorator('amount',{
							initialValue:data.amount,
							rules:[{required:true,message:'请输入转账金额'}]
						})(<Input prefix='￥' placeholder="请输入金额"/>)}
					</Form.Item>
					<Form.Item
						wrapperCol={{
							sm:{span:24,offset:0},
							md:{
								span:formItemLayout.wrapperCol.span,
								offset:formItemLayout.labelCol.span,
							}
						}}
					>
						<Button type='primary' onClick={onValidateForm}>
							下一步
						</Button>
					</Form.Item>
				</Form>
				<div className='desc'>
					<h3>说明</h3>
					<h4>转账到支付宝账户</h4>
					<p>
						如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
					</p>
					<h4>转账到银行卡</h4>
					<p>
						如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
					</p>
				</div>
			</Fragment>
		)
	}
}












