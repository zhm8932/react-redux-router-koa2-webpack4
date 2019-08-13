import React ,{ PureComponent } from 'react';
import { findDOMNode } from 'react-dom';

import moment from 'moment';
import {connect} from 'react-redux';

import {
	List,
	Card,
	Row,
	Col,
	Radio,
	Input,
	Progress,
	Button,
	Icon,
	Dropdown,
	Menu,
	Avatar,
	Modal,
	Form,
	message,
	DatePicker,
	Select,
	Divider
} from 'antd';

import './style.scss'
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import Result from '../../components/Result';
import {getRules,handleRules} from "../../redux/ListRedux";
import { formatDate } from '../../utils';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const {Search,TextArea} = Input;



@connect(({list})=>({
	rule:list.rule,
	loading:list.rule.loading
}))

@Form.create()

export default class BasicList extends PureComponent{
	state = {
		visible:false,
		done:false,
		status:''
	};
	statusMap={
		"0":"success",
		"1":"exception",
		"2":"active"
	};
	formLayout = {
		labelCol:{span:7},
		wrapperCol:{span:13}
	};
	constructor(props) {
		super(props);
	}
	componentDidMount(){
		const {dispatch} = this.props;
		dispatch(getRules({
			url:'/rule/list',
			data:{pageSize:10}
		}))
	}
	showModal =(flag)=>{
		this.setState({
			visible:!!flag,
			current:undefined
		})
	}
	showEditModal=(item)=>{
		console.log("item:",item)
		this.setState({
			visible:true,
			current:item
		})
	}
	editAndDelete =(key,currentItem)=>{
		console.log("key:",key,"currentItem:",currentItem)
		if(key==='edit'){
			this.showEditModal(currentItem)
		}else{
			Modal.confirm({
				title:'删除任务',
				content:'确定删除该任务吗？',
				okText:'确定',
				cancelText:'取消',
				onOk:()=>{this.deleteItem(currentItem.key)}
			})
		}
	}
	handleDone =()=>{
		console.log("取消")
		this.setState({
			done: false,
			visible: false,
		})
	}
	handleCancel =()=>{
		this.setState({
			visible: false,
		});
	}
	deleteItem = key=>{
		console.log("key：",key)
		const {dispatch} = this.props;
		dispatch(handleRules({
			url:'/rule/handleRule',
			method:'delete',
			data:{key:[key]}
		})).then(json=>{
			if(!json.code){
				message.success('删除成功')
			}else{
				message.error(json.message)
			}
		})
	}
	handleSubmit =e=>{
		console.log("handleSubmit---e:",e)
		e.preventDefault();
		const {dispatch,form} = this.props;
		const { current } = this.state;
		const method = current?'PUT':'POST';
		console.log("current---:",current)
		form.validateFields((err,values)=>{
			console.log("values:",values)
			if(err) return
			dispatch(handleRules({
				method:method,
				url:'/rule/handleRule',
				data:{...current,...values}
			})).then(json=>{
				this.setState({
					done:true
				})
				// message.success(`${current?'编辑':'新增'}提交成功`);
				// this.showModal(false)
			})
		})
	}
	handleChange = (e)=>{
		console.log("eeee:",e)
		let {value} = e.target;
		const {dispatch} = this.props;
		this.setState({status:value})
		dispatch(getRules({
			url:'/rule/list',
			data:{status:[value]}
		}))
	}
	handleListChange =(page,pageSize)=>{
		const {dispatch} = this.props;

		const params = {
			currentPage	:	page,
			pageSize	: 	pageSize,
		}
		console.log("params::::",params)
		dispatch(getRules({
			url:'/rule/list',
			data:params
		}))
	}
	handleSrerch = (value,e,m)=>{
		console.log("value:",value,"e:",e,'m:',m)
		const {dispatch} = this.props;
		const {status} = this.state;
		dispatch(getRules({
			url:'/rule/list',
			data:{
				title:value,
				status
			}
		}))
	}
	getModalContent =()=>{
		console.log("this.props::",this.props)
		const {
			form: { getFieldDecorator },
		} = this.props;

		const {done,current={}} = this.state;
		if(done){
			return (
				<Result
					type="success"
					title="操作成功"
					className="formResult"
					actions={
						<Button type='primary' onClick={()=>this.handleDone()}>知道了</Button>
					}
				/>
			)
		}
		return (
			<Form onSubmit={this.handleSubmit}>
				<FormItem label="任务名称" {...this.formLayout}>
					{
						getFieldDecorator('title',{
							rules:[{required:true,message:"请输入任务名称"}],
							initialValue:current.title,
						})(<Input placeholder="请输入任务名称"/>)
					}
				</FormItem>
				<FormItem label="开始时间" {...this.formLayout}>
					{
						getFieldDecorator('createdAt',{
							rules:[{required:true,message:"请选择开始时间"}],
							initialValue:current.createdAt?moment(current.createdAt):null

						})(
							<DatePicker
								className='col-24'
								format='YYYY-MM-DD HH:mm:ss'
							/>
						)
					}
				</FormItem>
				<FormItem label="任务负责人" {...this.formLayout}>
					{
						getFieldDecorator('owner',{
							rules:[{required:true,message:"请选择任务负责人"}],
							initialValue:current.owner
						})(
							<Select placeholder="请选择">
								<SelectOption value='付晓晓'>付晓晓</SelectOption>
								<SelectOption value='周毛毛'>周毛毛</SelectOption>
							</Select>
						)
					}
				</FormItem>
				<FormItem label="任务描述" {...this.formLayout}>
					{
						getFieldDecorator('desc',{
							rules:[{min:5,message:"请输入至少五个字符的产品描述"}],
							initialValue:current.desc
						})(
							<TextArea/>
						)
					}
				</FormItem>
			</Form>
		)
	}
	render(){

		const {
			rule:{list,pagination},
			loading
		} = this.props;
		const {visible,done,current = {}} = this.state;

		const paginationProps = {
			...pagination,
			showSizeChanger:true,
			showQuickJumper:true,
			onChange:this.handleListChange,
			onShowSizeChange:this.handleListChange
		}
		console.log("this.props:",this.props)
		console.log("this.state:",this.state)
		const TaskItem = ({title,value,bordered}) => (
			<div className='headerInfo'>
				<span>{title}</span>
				<p>{value}</p>
				{bordered&&<Divider type="vertical"/>}
			</div>
		)
		console.log("done:::",done)
		const modalFooter = done
			?{footer:null,onCancel:this.handleDone}
			:{okText:'保存',onCancel:this.handleCancel,onOk:this.handleSubmit,confirmLoading:loading}
		const MoreBtn = (props)=>(
			<Dropdown
				overlay={
					<Menu onClick={({ key }) => this.editAndDelete(key, props.current)}>
						<Menu.Item key='edit'>编辑</Menu.Item>
						<Menu.Item key='delete'>删除</Menu.Item>
					</Menu>
				}
			>
				<a>更多<Icon type='down'/></a>
			</Dropdown>
		)

		const extraContent = (
			<div className='extraContent'>
				<RadioGroup defaultValue='' onChange={e=>{this.handleChange(e)}}>
					<RadioButton value=''>全部</RadioButton>
					<RadioButton value='0'>已完成</RadioButton>
					<RadioButton value='1'>进行中</RadioButton>
					<RadioButton value='2'>等待中</RadioButton>
				</RadioGroup>
				<Search className='extraContentSearch' placeholder='请输入' onSearch={this.handleSrerch}/>
			</div>
		)
		return (
			<PageHeaderWrapper
				title="多状态列表"
			>
				<div className='standardList'>
					<Card bordered={false}>
						<Row>
							<Col sm={8} xs={24}>
								<TaskItem title="已完成" value={
									<span>
										{list.filter(item=>item.status===0).length}个任务
									</span>
								} bordered/>
							</Col>
							<Col sm={8} xs={24}>
								<TaskItem title="进行中" value={
									<span>{list.filter(item=>item.status===1).length}个任务</span>
								} bordered/>
							</Col>
							<Col sm={8} xs={24}>
								<TaskItem title="本周完成任务数" value="24个任务" />
							</Col>
						</Row>
					</Card>
					<Card title="标准列表"
						  className="listCard"
						  bordered={false}
						  extra={extraContent}
					>
						<Button
							icon='plus'
							className='col-24'
							type='dashed'
							onClick={()=>this.showModal(true)}
							key='add'
						>添加</Button>
						<List
							size="large"
							rowKey="id"
							dataSource={list}
							pagination={paginationProps}
							loading={loading}
							renderItem={item=>(
								<List.Item className="list-item"
									actions={[
										<a onClick={(e)=>{
											e.preventDefault()
											this.showEditModal(item)
										}}>编辑</a>,
										<MoreBtn current={item}/>
									]}
								>
									<List.Item.Meta
										avatar={<Avatar src={item.avatar} shape="square" size={"large"}/>}
										title={<a href={item.href}>{item.title}</a> }
										description={item.desc}
									/>
									<div className='listContent'>
										<div className="listContentItem">
											<p>Owner</p>
											<p>{item.owner}</p>
										</div>
										<div className="listContentItem">
											<p>开始时间</p>
											<p>{formatDate(item.createdAt,'YYYY-MM-DD hh:mm')}</p>
										</div>
										<div className="listContentItem">
											{/*<Progress percent={item.percent} status={item.status}/>*/}
											<Progress percent={item.progress} status={this.statusMap[item.status]} strokeWidth={6} style={{ width: 180 }} />
										</div>
									</div>

								</List.Item>

							)}/>
					</Card>
				</div>
				<Modal
					title={current.key?`任务编辑`:'任务添加'}
					visible={visible}
					className='standardListForm'
					destroyOnClose
					{...modalFooter}
				>
					{this.getModalContent()}
				</Modal>
			</PageHeaderWrapper>
		)
	}

}


















