import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import {
	Form,
	Input,
	DatePicker,
	Select,
	Button,
	Card,
	InputNumber,
	Radio,
	Icon,
	message,
	Tooltip
}	from 'antd';

import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import fetchs from "../../utils/fetch";
import './style.scss';
const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

import {handleBasicSubmit,handleBasicSubmitSuccess,handleBasic} from '../../redux/FormRedux'
const formItemLayout= {
	labelCol:{
		className:'col-7'
	},
	wrapperCol:{
		className:'col-10 lt'
	}
}
const submitFormLayout = {
	wrapperCol: {
		className:'offset-7'
	},
};
@Form.create()


@connect(
	({ form }) => {
		console.log("form-------------:",form)
		return {
			basic:form.basic,
			submitting:form.basic.loading
		}
	},
	(dispatch,ownPorps)=>(
		{
			handleSubmit:(e)=>{
				console.log("ownPorps-------:",ownPorps)
				const {form} = ownPorps;
				e.preventDefault();
				form.validateFieldsAndScroll((err,values)=>{
					if(!err){
						if(values.date){
							values.date = values.date.map(item=>{
								return item.format('YYYY-MM-DD')
							})
						}
						console.log("values:",values)
						dispatch(handleBasic({url:'/form',method:'POST',data:values}))
							.then(store=>{
								console.log("store---",store)
								let {payload} = store;
								if(payload.success){
									message.success("提交成功")
								}else{
									message.error("提交失败，请重试！")
								}
							})
						/*dispatch(handleBasicSubmit({url:'/form'}));
						fetchs({
							url:'/form',
							method:'POST',
							data:values
						}).then(json=>{
							console.log("json:",json)

							message.success("提交成功")
						})*/
					}
				})
			}
		}
	)

)

export default class BasicForm extends PureComponent{
	render(){
		const {submitting} = this.props;
		const {
			form:{getFieldDecorator,getFieldValue},
		} = this.props;
		console.log("this.props:",this.props)
		return (
			<PageHeaderWrapper
				title="基础表单"
				content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
			>
				<Card>
					<Form onSubmit={this.props.handleSubmit} hideRequiredMark className="form-list">
						<FormItem {...formItemLayout} label="标题">
							{getFieldDecorator('title',{
								rules:[
									{
										required:true,
										message:'请输入标题'
									}
								]
							})(<Input placeholder='给目标起个名字'/>)}
						</FormItem>
						<FormItem {...formItemLayout} label="起止日期">
							{getFieldDecorator('date',{
								rules:[]
							})(<RangePicker className='col-24' placeholder={['开始日期','结束日期']}/>)}
						</FormItem>
						<FormItem {...formItemLayout} label="目标描述">
							{
								getFieldDecorator('goal',{
									rules:[
										{
											required: true,
											message:'请输入目标描述'
										}
									]
								})(
									<TextArea
										placeholder="请输入你的阶段性工作目标"
										rows={4}
									>
									</TextArea>
								)
							}
						</FormItem>
						<FormItem {...formItemLayout} label="衡量标准">
							{getFieldDecorator('standard',{
								rules:[
									{
										required:true,
										message:'请输入衡量标准'
									},{
										min:8,
										message:"衡量标准不少于8位"
									}
								]
							})(
								<TextArea placeholder="请输入衡量标准" rows={4}/>
							)}
						</FormItem>
						<FormItem {...formItemLayout}
								  label={
								<span>
									客户
									<em className="optional">
										（选填）
										<Tooltip title="目标的服务对象">
											<Icon type="info-circle-o"/>
										</Tooltip>
									</em>
								</span>
							}
						>
							{getFieldDecorator('client')(
								<Input placeholder="请描述你服务的客户，内部客户直接 @姓名／工号"/>
							)}
						</FormItem>
						<FormItem {...formItemLayout}
							label={
								<span>
									权重
									<em className="optional">（选填）</em>
								</span>
							}
						>
							{getFieldDecorator('weight')(<InputNumber min={0} max={100} placeholder="请输入"/>)}
							<span className="ant-form-text">%</span>
						</FormItem>
						<FormItem {...formItemLayout} label="目标公开" help="客户、邀评人默认被分享">
							<div>
								{getFieldDecorator('public',{
									initialValue:'1'
								})(
									<Radio.Group>
										<Radio value="1">公开</Radio>
										<Radio value="2">不部分公开</Radio>
										<Radio value="3">公开</Radio>
									</Radio.Group>
								)}
								<FormItem>
									{getFieldDecorator('publicUsers')(
										<Select placeholder="公开给" data-c={getFieldValue('public')}
												mode='multiple'
												style={{
													display:getFieldValue('public') === '2'?'block':'none'
												}}
										>
											<Option value='1'>同事甲</Option>
											<Option value='2'>同事乙</Option>
											<Option value='3'>同事丙</Option>
										</Select>
									)}
								</FormItem>
							</div>
						</FormItem>
						<FormItem {...submitFormLayout} >
							<Button  type="primary" htmlType="submit" loading={submitting}>
								提交
							</Button>
							<Button style={{marginLeft:10}}>保存</Button>
						</FormItem>
					</Form>

				</Card>
			</PageHeaderWrapper>
		)
	}
}







