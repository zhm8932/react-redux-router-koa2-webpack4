import React,{PureComponent} from 'react';

import {
	Card,
	Button,
	Form,
	Icon,
	Col,
	Row,
	DatePicker,
	TimePicker,
	Input,
	Select,
	Popover
} from 'antd';

import {connect} from 'react-redux';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import FooterToolbar from '../../components/FooterToolbar';
import TableForm from '../../components/Table/TableForm';

const {Option} = Select;
const {RangePicker} = DatePicker;

import './style.scss'

const filedLabels={
	name:'仓库名',
	url:'仓库域名',
	owner:'仓库管理员',
	approver:'审批人',
	dateRange:'生效日期',
	type:'仓库类型',
	name2:'任务名',
	url2:'任务描述',
	owner2:'执行人',
	approver2:'责任人',
	dateRange2:'生效时间',
	type2:'任务类型',
}

const tableData = [
	{
		key: '1',
		workId: '00001',
		name: 'John Brown',
		department: 'New York No. 1 Lake Park',
	},
	{
		key: '2',
		workId: '00002',
		name: 'Jim Green',
		department: 'London No. 1 Lake Park',
	},
	{
		key: '3',
		workId: '00003',
		name: 'Joe Black',
		department: 'Sidney No. 1 Lake Park',
	},
];

const mapStateToProps = ({form})=>({
	advance:form.advance,
	submitting: form.advance.loading
});

const mapDispatchToProps = (dispatch,ownPorps)=>({
	handleSubmit:(data)=>{
		console.log("data:",data)
	}
});

@connect(mapStateToProps,mapDispatchToProps)

@Form.create()

export default class AdvanceForm extends PureComponent{
	constructor(props){
		super(props);
	}
	handleSubmit(e){
		const {form,dispatch,submitting} = this.props;
		const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
		validateFieldsAndScroll((error,values)=>{
			console.log("error:",error)
			if(!error){
				console.log("提交数据：",values)
			}
		})
	}
	getErrorInfo=()=>{

		const {form:{getFieldsError}} = this.props;
		const errors = getFieldsError();
		console.log("errors:",errors);
		const errorCount = Object.keys(errors).filter(key=>errors[key]).length;
		if(!errors||errorCount===0){
			return null
		}

		//滚动到指定位置
		const scrollToField = fieldKey=>{
			console.log("fieldKey---:",fieldKey)
			const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
			if(labelNode){
				labelNode.scrollIntoView(true);
			}
			console.log("labelNode---:",labelNode)
		}
		const errorList = Object.keys(errors).map(key=>{
			console.log("key----:",key)
			if(!errors[key]){
				return null
			}
			return (
				<li key={key} className='errorListItem' onClick={()=>scrollToField(key)}>
					<div className="errorMessage">{errors[key][0]}</div>
					<div className="errorField">{filedLabels[key]}</div>
				</li>
			)
		})
		return (
			<span className='errorIcon'>
				<Popover
					title="表单校验信息"
					content={errorList}
					trigger="click"
					overlayClassName="errorPopover"
				>
					<Icon type="exclamation-circle"/>
				</Popover>
				{errorCount}
			</span>
		)
	}
	render(){
		console.log("this.props----:",this.props);
		const {form,dispatch,submitting} = this.props;
		const {getFieldDecorator,validateFieldsAndScroll,getFieldsError}  = form;
		return (
			<PageHeaderWrapper
				title="高级表单"
				content="高级表单常见于一次性输入和提交大批量数据的场景."
			>
				<Card title="仓库管理" className='card'>
					<Form hideRequiredMark>
						<ul className='form-list advanced-list'>
							<li className='col-sm-24 col-md-12 col-lg-6'>
								<Form.Item label={filedLabels.name}>
									{getFieldDecorator('name',{
										rules:[{required:true,message:"请输入仓库名称"}]
									})(<Input placeholder="请输入仓库名称"/>)}
								</Form.Item>
							</li>
							<li className='col-sm-24 col-md-12 col-lg-8 col-xl-6 col-xl-offset-2'>
								<Form.Item label={filedLabels.url}>
									{getFieldDecorator('url',{
										rules:[{required:true,message:"请输入"}]
									})(<Input
										placeholder="请输入"
										addonBefore="http://"
										addonAfter=".com"
									/>)}
								</Form.Item>
							</li>
							<li className='col-sm-24 col-md-24 col-lg-10 col-xl-8 col-xl-offset-2'>
								<Form.Item label={filedLabels.owner}>
									{getFieldDecorator("owner",{
										rules:[{required:true,message:"请选择管理员"}]
									})(
										<Select placeholder="请选择管理员">
											<Option value='xiao'>付晓晓</Option>
											<Option value='mao'>周毛毛</Option>
										</Select>
									)}
								</Form.Item>
							</li>
							<li className="col-sm-24 col-md-12 col-lg-6">
								<Form.Item label={filedLabels.approver}>
									{getFieldDecorator("approver",{
										rules:[{required:true,message:"请选择审批人员"}]
									})(
										<Select placeholder="请选择审批人员">
											<Option value="xiao">福晓晓</Option>
											<Option value="mao">周毛毛</Option>
										</Select>
									)}
								</Form.Item>
							</li>
							<li className="col-sm-24 col-md-12 col-lg-8 col-xl-6 col-xl-offset-2">
								<Form.Item label={filedLabels.dateRange2}>
									{getFieldDecorator('dataRange',{
										rules:[{required:true,message:"请选择生效日期"}]
									})(
										<RangePicker placeholder={['开始日期','结束日期']} style={{width: '100%'}}/>
									)}
								</Form.Item>
							</li>
							<li className="col-sm-24 col-md-24 col-lg-10 col-xl-8 col-xl-offset-2">
								<Form.Item label={filedLabels.type}>
									{getFieldDecorator('type',{
										rules:[{required:true,message:"请选择仓库类型"}]
									})(
										<Select placeholder="请选择仓库类型">
											<Option value="private">私密</Option>
											<Option value="public">公开</Option>
										</Select>
									)}
								</Form.Item>
							</li>
						</ul>
					</Form>
				</Card>
				<Card title="任务管理" className='card'>
					<Form hideRequiredMark>
						<Col lg={6} md={12} sm={24}>
							<Form.Item label={filedLabels.name2}>
								{getFieldDecorator('name2',{
									rules:[{required:true,message:"请输入"}]
								})(<Input placeholder="请输入"/>)}
							</Form.Item>
						</Col>
						<Col xl={{span:6,offset:2}} lg={{span:8}} md={{span:12}} sm={24}>
							<Form.Item label={filedLabels.url2}>
								{getFieldDecorator("url2",{
									rules:[{required:true,message:"请输入"}]
								})(<Input placeholder="请输入任务描述"/>)}
							</Form.Item>
						</Col>
						<Col xl={{span:8,offset:2}} lg={{span:10}} md={{span:24}} sm={24}>
							<Form.Item label={filedLabels.owner2}>
								{getFieldDecorator('owner2',{
									rules:[{required:true,message:"请选择执行人"}]
								})(
									<Select placeholder="请选择执行人">
										<Option value="zhou">小周</Option>
										<Option value="wang">小王</Option>
									</Select>
								)}
							</Form.Item>
						</Col>
						<Col lg={6} md={12} sm={24}>
							<Form.Item label={filedLabels.approver2}>
								{getFieldDecorator('approver2',{
									rules:[{required:true,message:"请选择"}]
								})(
									<Select placeholder="请选择责任人">
										<Option value="zhou">小周</Option>
										<Option value="wang">小王</Option>
									</Select>
								)}
							</Form.Item>
						</Col>
						<Col xl={{span:6,offset:2}} lg={{span:8}} md={{span:12}} sm={24}>
							<Form.Item label={filedLabels.dateRange2}>
								{getFieldDecorator("dateRange2",{
									rules:[{required:true,message:"请输入"}]
								})(
									<TimePicker
										style={{width:'100%'}}
										placeholder="提醒时间"
										getPopupContainer={trigger=>trigger.parentNode}
									/>
								)}
							</Form.Item>
						</Col>
						<Col xl={{span:8,offset:2}} lg={{span:10}} md={{span:24}} sm={24}>
							<Form.Item label={filedLabels.type2}>
								{getFieldDecorator('type2',{
									rules:[{required:true,message:"请选择任务类型"}]
								})(
									<Select placeholder="请选择任务类型">
										<Option value="private">私密</Option>
										<Option value="public">公开</Option>
									</Select>
								)}
							</Form.Item>
						</Col>
					</Form>
				</Card>
				<Card title="成员管理">
					{getFieldDecorator('memeber',{
						initialValue:tableData
					})(<TableForm/>)}
				</Card>
				<FooterToolbar>
					{this.getErrorInfo()}
					<Button type='primary' onClick={this.handleSubmit.bind(this)} loading={submitting}>
						提交
					</Button>
				</FooterToolbar>
			</PageHeaderWrapper>
		)
	}
}
