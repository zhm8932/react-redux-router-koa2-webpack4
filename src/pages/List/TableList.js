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


const getValue = obj =>
	Object.keys(obj)
	.map(key => obj[key])
	.join(',');

import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import StandTable from '../../components/StandTable';
import './style.scss'
import {formatDate} from '../../utils'

import {getRules,handleRules} from '../../redux/ListRedux'


const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

const CreateForm = Form.create()(props=>{
	console.log("props:----：",props)
	const {modalVisible,form,handleModalVisible,handleAdd} = props;

	const okHandle = ()=>{
		form.validateFields((err,fieldsValue)=>{
			if(err) return
			form.resetFields();
			handleAdd(fieldsValue)
		})
	}

	return (
		<Modal
			destroyOnClose
			title="新建规则"
			visible={modalVisible}
			onOk={okHandle}
			onCancel={()=>handleModalVisible()}
		>
			<FormItem>
				{form.getFieldDecorator('desc',{
					rules:[{required:true,message:'请输入至少五个字符的规则描述',min:5}]
				})(<Input placeholder="请输入描述"/>)}
			</FormItem>
		</Modal>
	)
})


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

		this.formLayout = {
			labelCol: { span: 7 },
			wrapperCol: { span: 13 },
		};
	}
	backword = () =>{
		const { currentStep } = this.state;
		this.setState({
			currentStep : currentStep-1
		})
	}
	forward = () =>{
		const { currentStep } = this.state;
		this.setState({
			currentStep:currentStep + 1
		})
	}
	handleNext = currentStep => {
		const {form,handleUpdate} = this.props;
		const {formVals:oldValue} = this.state;
		form.validateFields((err,fieldsValue)=>{
			if(err) return
			const formVals = {...oldValue,...fieldsValue};
			console.log("formVals:::",formVals)
			this.setState({
				formVals
			},()=>{
				console.log("currentStep：",currentStep)
				if(currentStep<2){
					this.forward()
				}else{
					handleUpdate(formVals)
				}
			})
		})
	}
	renderContent  = (currentStep,formVals)=>{
		const {form} = this.props;
		console.log("formVals:",formVals)
		if(currentStep ===1){
			return (
				<Fragment>
					<FormItem {...this.formLayout} label="监控对象">
						{form.getFieldDecorator('target',{
							initialValue:formVals.target
						})(
							<Select className='col-24'>
								<Option value='0'>表一</Option>
								<Option value='1'>表二</Option>
							</Select>
						)}
					</FormItem>
					<FormItem {...this.formLayout} label="规则模板">
						{
							form.getFieldDecorator('template',{
								initialValue:formVals.template
							})(
								<Select className='col-24'>
									<Option value="0">规则模板一</Option>
									<Option value="1">规则模板二</Option>
								</Select>
							)
						}
					</FormItem>
					<FormItem {...this.formLayout} label="规则类型">
						{form.getFieldDecorator('type',{
							initialValue:formVals.type
						})(
							<RadioGroup>
								<Radio value="0">弱</Radio>
								<Radio value="1">强</Radio>
							</RadioGroup>
						)}
					</FormItem>
				</Fragment>
			)
		}
		if(currentStep===2){
			return (
				<Fragment>
					<FormItem {...this.formLayout} label="开始时间">
						{form.getFieldDecorator('time',{
							rules:[{required:true,message:'请选择开始时间！'}]
						})(
							<DatePicker
								className="col-24"
								style={{width:'100%'}}
								showTime
								format="YYYY-MM-DD HH:mm:ss"
								placeholder="请选择开始时间"
							/>
						)}
					</FormItem>
					<FormItem {...this.formLayout} label="调度时间">
						{form.getFieldDecorator('frequency',{
							initialValue:formVals.frequency
						})(
							<Select className='col-24'>
								<Option value="month">月</Option>
								<Option value="week">周</Option>
							</Select>
						)}
					</FormItem>
				</Fragment>
			)
		}
		return (
			<Fragment>
				<FormItem {...this.formLayout} key="name" label="规则名称">
					{form.getFieldDecorator('name',{
						rules:[{required:true,message:"请输入规则名称"}],
						initialValue:formVals.name
					})(<Input placeholder="请输入"/>)}
				</FormItem>
				<FormItem {...this.formLayout} key="desc" label="规则描述">
					{form.getFieldDecorator('desc',{
						rules:[{required:true,message:"请输入规则描述"}],
						initialValue:formVals.desc
					})(<Input placeholder="请输入"/>)}
				</FormItem>
			</Fragment>
		)
	}
	renderFooter =currentStep=>{
		const {handleUpdateModalVisible} = this.props;
		if(currentStep===1){
			return [
					<Button key="back" className='lt' onClick={()=>this.backword()}>上一步</Button>,
					<Button key="cancel" onClick={()=>handleUpdateModalVisible()}>取消</Button>,
					<Button key="forward" type='primary' onClick={()=>this.handleNext(currentStep)}>下一步</Button>
			]
		}
		if(currentStep===2){
			return [
				<Button key="back" className='lt' onClick={()=>this.backword()}>上一步</Button>,
				<Button key="cancel" onClick={()=>handleUpdateModalVisible()}>取消</Button>,
				<Button key="forward" type='primary' onClick={()=>this.handleNext(currentStep)}>完成</Button>
			]
		}
		return [
			<Button key="cancel" onClick={()=>handleUpdateModalVisible()}>取消</Button>,
			<Button key="forward" type="primary" onClick={()=>this.handleNext(currentStep)}>下一步</Button>
		]
	}
	render(){
		console.log("this.props:-:",this.props)
		const {updateModalVisible,handleUpdateModalVisible} = this.props;

		const { currentStep, formVals } = this.state;
		return (
			<Modal
				title="配置规则"
				visible={updateModalVisible}
				footer={this.renderFooter(currentStep)}
				onCancel={()=>handleUpdateModalVisible()}
			>
				<Steps className='mb-lg' size="small" current={currentStep}>
					<Step title="基本信息"/>
					<Step title="配置规则属性"/>
					<Step title="设定调度周期"/>
				</Steps>
				{this.renderContent(currentStep,formVals)}
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
		subscribeModalVisible:false,
		confirmModalVisible:false,
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
			// mark to display a total number
			needTotal: true,
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
					<a onClick={()=>{this.handleSubscribeModal(true,record)}}>订阅警报</a>
				</Fragment>
			)
		}
	];
	componentDidMount(){
		const {dispatch} = this.props;
		dispatch(getRules({
			url:'/rule/list',
			data:{pageSize:10}
		}))
	}
	handleStandardTableChange=(pagination, filtersArg, sorter)=>{
		console.log("filtersArg:::",filtersArg)
		const { formValues } = this.state;
		const { dispatch} = this.props;

		console.log("Object.keys(filtersArg)：",Object.keys(filtersArg))
		const filters = Object.keys(filtersArg).reduce((obj,key)=>{
			console.log("obj::",obj)
			const newObj = {...obj};
			console.log("newObj::",obj,filtersArg[key],getValue(filtersArg[key]))
			// newObj[key] = getValue(filtersArg[key])
			newObj[key] = filtersArg[key].join(',')
			return newObj;
		},{})
		console.log("filters:::",filters)
		const params = {
			currentPage : pagination.current,
			pageSize : pagination.pageSize,
			...filters,
			...formValues
		}

		if(sorter.field){
			params.sorter = `${sorter.field}_${sorter.order}`
		}

		dispatch(getRules({
			url:'/rule/list',
			data:params
		}))
	}
	handleSelectRows =(rows)=>{
		console.log("rows：",rows)
		this.setState({
			selectedRows:rows
		})
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
	handleUpdateModalVisible=(flag,record)=>{
		console.log("record:",record)
		this.setState({
			updateModalVisible:!!flag,
			stepFormValues:record||{},

		})
	}
	handleSubscribeModal = (flag,record)=>{
		console.log("handleSubscribeModal:flag:",flag)
		this.setState({
			subscribeModalVisible:!!flag,
			stepFormValues:record||{}
		})
	}
	//弹框是否显示
	handleModal = (type,flag,record)=>{
		this.setState({
			[type]:!!flag,
			stepFormValues:record||{}
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
	handleModalVisible = flag=>{
		console.log("handleModalVisible--modalVisible:",flag)
		this.setState({
			modalVisible:!!flag
		})
	}
	handleAdd = (fields)=>{
		const {dispatch} = this.props;
		dispatch(handleRules({
			url:'/rule/handleRule',
			method:'POST',
			data:fields
		})).then(json=>{
			console.log("json:",json)
			if(!json.error){
				message.success("添加成功！！！")
			}
		})
		this.handleModalVisible();
	}
	handleUpdate = (fields)=>{
		const {dispatch} = this.props;
		const payload = {
			name : fields.name,
			desc : fields.desc,
			key  : fields.key,

		};
		dispatch(handleRules({
			url:'/rule/handleRule',
			method:'put',
			data:payload
		})).then(json=>{
			if(!json.error){
				message.success("更新成功！");
				setTimeout(()=>{
					this.handleUpdateModalVisible();
				},500)

			}
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
	renderSubscribeForm(){
		const {subscribeModalVisible} = this.state;
		return (
			<Modal
				destroyOnClose
				title="订阅"
				visible={subscribeModalVisible}
				onCancel={()=>this.handleSubscribeModal()}
			>
				<div>确认是否订阅？</div>
			</Modal>
		)
	}
	renderConfirm=(key)=>{
		const { dispatch } = this.props;
		const {confirmModalVisible,stepFormValues} = this.state;
		const rowsLen = stepFormValues.length;
		return (
			<Modal
				destroyOnClose
				title="删除"
				visible={confirmModalVisible}
				onCancel={()=>this.handleModal('confirmModalVisible')}
				onOk={()=>{
					const key = stepFormValues.map(item=>item.key);
					dispatch(handleRules({
						url:'/rule/handleRule',
						method:'delete',
						data:{key:key}
					})).then(json=>{
						if(!json.error){
							message.success("删除成功");
							this.setState({
								selectedRows: []
							});
							this.handleModal('confirmModalVisible')
						}
					})
				}}
			>
				<div>
					{stepFormValues.map((item,index)=>(
						<span key={item.key}>{item.name}{rowsLen-1>index?"、":''}</span>
					))}
					<p>确认是否删除该{rowsLen}项？</p>
				</div>
			</Modal>
		)
	}
	handleMenuClick=(e)=>{
		const { dispatch } = this.props;
		const { selectedRows } = this.state;
		console.log("e:",e,"selectedRows:",selectedRows)
		const key = selectedRows.map(row=>({key:row.key,name:row.name}));
		console.log("key:::",key)
		switch (e.key) {
			case 'delete':
				console.log("删除")
				/*dispatch(handleRules({
					url:'/rule/handleRule',
					method:'delete',
					data:{key}
				})).then(json=>{
					if(!json.error){
						message.success("删除成功")
					}
				})*/
				this.handleModal('confirmModalVisible',true,key)

				break;
			default :
				break;
		}
	}
	render(){
		console.log("this.props---:",this.props)
		const {
			rule:data,
			loading,
		} = this.props;

		const menu = (
			<Menu onClick={this.handleMenuClick} selectedKeys={[]}>
				<Menu.Item key="delete">删除</Menu.Item>
				<Menu.Item key="approval">批量审批</Menu.Item>
			</Menu>
		);

		const parentMethods = {
			handleAdd:this.handleAdd,
			handleModalVisible:this.handleModalVisible
		}

		const updateMethods = {
			handleUpdateModalVisible : this.handleUpdateModalVisible,
			handleUpdate:this.handleUpdate
		}
		const {selectedRows,updateModalVisible,stepFormValues,modalVisible,subscribeModalVisible,confirmModalVisible} = this.state;
		console.log("stepFormValuesstepFormValues:",Object.keys(stepFormValues))
		return (
			<PageHeaderWrapper title="查询表格">
				<Card bordered={false}>
					<div className="tableList">
						<div className="tableListForm">{this.renderForm()}</div>
						<div className="tableListOperator">
							<Button icon='plus' type='primary' onClick={()=>this.handleModalVisible(true)}>
								新建
							</Button>
							{selectedRows.length>0?<span>
								<Button>批量操作</Button>
								<Dropdown overlay={menu}>
									<Button>更多操作<Icon type="down"/></Button>
								</Dropdown>
							</span>:null}
						</div>
						<StandTable
							selectedRows={selectedRows}
							loading={loading}
							columns={this.columns}
							data={data}
							onSelectRow={this.handleSelectRows}
							onChange={this.handleStandardTableChange}
						/>
					</div>

				</Card>
				<CreateForm {...parentMethods} modalVisible={modalVisible}/>
				{stepFormValues&&Object.keys(stepFormValues).length?
					<UpdateForm
						values={stepFormValues}
						updateModalVisible={updateModalVisible}
						{...updateMethods}
					/>:null
				}
				{subscribeModalVisible?this.renderSubscribeForm():null}
				{confirmModalVisible?this.renderConfirm():null}

			</PageHeaderWrapper>
		)
	}
}