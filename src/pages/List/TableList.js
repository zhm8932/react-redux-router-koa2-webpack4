import React, {Fragment, PureComponent} from 'react';

import {connect} from 'react-redux';
import {
	Row,
	Col,
	Card,
	Form,
	Input,
	Select,
	Icon,
	Button,
	Dropdown,
	Menu,
	InputNumber,
	DatePicker,
	Modal,
	message,
	Badge,
	Divider,
	Steps,
	Radio
} from 'antd';

const FormItem = Form.Item;
const {Step} = Steps;
const {TextArea} = Input;
const {Option} = Select;
const RadioGroup = Radio.Group;

import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import StandTable from '../../components/StandTable';
import './style.scss'
import {formatDate} from '../../utils'

import {getRules} from '../../redux/ListRedux'


const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

@Form.create()
class UpdateForm extends PureComponent{
	constructor(props){
		super(props)
		this.state = {
			formVals: {
				name: props.values.name,
				desc: props.values.desc,
				key: props.values.key,
				target: '0',
				template: '0',
				type: '1',
				time: '',
				frequency: 'month',
			},
			currentStep: 0,
		};
	}
	render(){
		return (
			<Modal
				title="配置规则"
				visible={true}
			>
				<div>修改的内容</div>
			</Modal>
		)
	}
}

@Form.create()
@connect(({list,loading})=>({
	rule:list.rule,
	loading:loading
}))
export default class TableList extends PureComponent{
	state ={
		modalVisible:false,
		updateModalVisible:false,
		expandForm:false,
		selectedRows:[],
		formValues:[],
		stepFormValues:{}
	};
	columns=[
		{
			title: '规则名称',
			dataIndex: 'name',
		},
		{
			title: '描述',
			dataIndex: 'desc',
		},
		{
			title:'服务调用次数',
			dataIndex:'callNo',
			sorter:true,
			render:val=>`${val}万`,
			align:'right'
		},
		{
			title:'状态',
			dataIndex:'status',
			filters:[
				{
					text: status[0],
					value: 0,
				},
				{
					text: status[1],
					value: 1,
				},
				{
					text: status[2],
					value: 2,
				},
				{
					text: status[3],
					value: 3,
				},

			],
			render:val=><Badge status={statusMap[val]} text={status[val]}/>
		},
		{
			title:'上次调度时间',
			dataIndex:'updatedAt',
			sorter:true,
			render:val => <span>{formatDate(val,'YYYY-MM-DD hh:mm:ss')}</span>
		},
		{
			title:'操作',
			render:(text,record)=>(
				<Fragment>
					<a onClick={()=>{this.handleUpdateModalVisible(true,record)}}>配置</a>
					<Divider type='vertical'/>
					<a>订阅警报</a>
				</Fragment>
			)
		}
	];
	componentDidMount(){
		const {dispatch} = this.props;
		dispatch(getRules({
			url:'/rule/list',
			data:{pageSize:5}
		}))
	}
	handleFormReset=()=>{
		const {form,dispatch} = this.props;
		form.resetFields()
	}
	toggleForm=()=>{
		const {expandForm} = this.state;
		this.setState({
			expandForm:!expandForm
		});
	}
	handleUpdateModalVisible(flag,record){
		console.log("record:",record)
		this.setState({
			updateModalVisible:!!flag,
			stepFormValues:record||{},

		})
	}
	handleSearch = e=>{
		e.preventDefault();
		const {dispatch,form} = this.props;
		form.validateFields((err,fieldsValue)=>{
			if(err) return
			const values = {
				...fieldsValue
			}
			console.log("values:",values)
			dispatch(getRules({
				url:'/rule/list',
				data:values
			}))
		})
	}
	renderSimpleForm(){
		const {
			form:{getFieldDecorator}
		} = this.props;

		return (
			<Form onSubmit={this.handleSearch} className='search-wrapper'>
				<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
					<Col md={8} sm={24}>
						<Form.Item label="规则名称">
							{getFieldDecorator('name')(<Input placeholder='请输入规则名称'/>)}
						</Form.Item>
					</Col>
					<Col md={8} sm={24}>
						<Form.Item label='使用状态'>
							{getFieldDecorator('status')(
								<Select placeholder='请选择'>
									<Option value='0'>关闭</Option>
									<Option value='1'>运行中</Option>
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col md={8} sm={24}>
						<span className='submitButtons'>
							<Button type='primary' htmlType='submit'>
								查询
							</Button>
							<Button style={{marginLeft:8}} onClick={this.handleFormReset}>重置</Button>
							<a style={{marginLeft:8}} onClick={this.toggleForm}>展开 <Icon type='down'/></a>
						</span>
					</Col>
				</Row>
			</Form>
		)
	}
	renderAdvanceForm(){
		const {
			form:{getFieldDecorator}
		} = this.props;
		return (
			<Form onSubmit={this.handleSearch} className='search-wrapper'>
				<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
					<Col md={8} sm={24}>
						<FormItem label="规则名称">
							{getFieldDecorator('name')(<Input placeholder="请输入"/>)}
						</FormItem>
					</Col>
					<Col md={8} sm={24}>
						<FormItem label="使用状态">
							{getFieldDecorator('status')(
								<Select placeholder='请选择'>
									<Option value='0'>关闭</Option>
									<Option value='1'>运行中</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col md={8} sm={24}>
						<FormItem label="调用次数">
							{getFieldDecorator('number')(<Input placeholder="请输入"/>)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
					<Col md={8} sm={24}>
						<FormItem label="更新日期">
							{getFieldDecorator('date')(
								<DatePicker className='col-24' placeholder="请输入更新日期"/>
							)}
						</FormItem>
					</Col>
					<Col md={8} sm={24}>
						<FormItem label="使用状态">
							{getFieldDecorator('status3')(
								<Select  placeholder='请选择'>
									<Option value='0'>关闭</Option>
									<Option value='1'>运行中</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col md={8} sm={24}>
						<FormItem label="使用状态">
							{getFieldDecorator('status4')(
								<Select  placeholder='请选择'>
									<Option value='0'>关闭</Option>
									<Option value='1'>运行中</Option>
								</Select>
							)}
						</FormItem>
					</Col>
				</Row>
				<div className='rt'>
					<Button htmlType='submit' type='primary'>查询</Button>
					<Button className='ml-xs' onClick={this.handleFormReset}>重置</Button>
					<a className='ml-xs' onClick={this.toggleForm}>收起<Icon type='up'/></a>
				</div>
			</Form>
		)
	}
	renderForm(){
		const {expandForm} = this.state;
		return expandForm?this.renderAdvanceForm():this.renderSimpleForm()
	}
	render(){
		console.log("this.props---:",this.props)
		const {
			rule:data,
			loading,
		} = this.props;

		const {updateModalVisible,stepFormValues} = this.state;
		return (
			<PageHeaderWrapper title="查询表格">
				<Card bordered={false}>
					<div className="tableList">
						<div className="tableListForm">{this.renderForm()}</div>
						<div className="tableListOperator">
							<Button icon='plus' type='primary'>
								新建
							</Button>
						</div>
						<div>
							表格内容
						</div>
					</div>
					<StandTable
						loading={loading}
						columns={this.columns}
						data={data}
					/>

				</Card>
				<UpdateForm
					values={stepFormValues}
				/>
			</PageHeaderWrapper>
		)
	}
}