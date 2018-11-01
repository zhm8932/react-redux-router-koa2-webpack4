import React,{PureComponent,Fragment} from 'react';
import {Card,Badge,Table,Divider,Alert} from 'antd';
import {connect} from 'react-redux';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import './BasicProfile.scss'
import {getRules} from '../../redux/ListRedux';

const goodsColumns = [
	{title: '商品编码', 	dataIndex: 'callNo',},
	{title: '商品名称', 	dataIndex:'name'},
	{title: '商品条码', 	dataIndex:'barcode'},
	{title: '单价', 	   	dataIndex:'price',sorter:true,needTotal:true,render:(text, record, index)=>`￥${parseInt(text).toFixed(2)}`},
	{title: '数量（件）', dataIndex:'num',sorter:true,needTotal:true,render:text=>(text<50?<span className='red'>{text}</span>:text)},
	{title: '金额', dataIndex:'total',render:(text,item)=>`￥${(item.price*item.num).toFixed(2)}`},
]

const statusMap = ['success', 'processing','default','error', 'warning'];
const status = ['关闭', '运行中', '已上线', '异常'];
const progressMap = ['联系客户','取货员出发','取货员接单','申请审批通过','发起退货申请','退货中','退货完成'];
const progressColumns = [
	{title:'时间',dataIndex:'createdAt'},
	{title:'当前进度',dataIndex:'status',render:val=>progressMap[val]},
	{title:'状态',dataIndex:'status',render:val=><Badge status={progressMap[val]} text={status[val]}/>},
	{title:'操作员',dataIndex:'owner'}
]
const initTotalList = (props)=>{
	// const {columns=[]} = props;
	// const totalList = [];
	const totalList = {};
	console.log("goodsColumns：：：",goodsColumns)
	goodsColumns.forEach(item=>{
		if(item.needTotal){
			// totalList.push({...item,total:0})
			totalList[item.dataIndex] = {...item,total:0}
		}

	})
	return totalList;
}

@connect(({list})=>({
	goodsData:list.rule,
	loading:list.rule.loading
}))
export default class BasicProfile extends PureComponent{
	constructor(props){
		super(props);
		const needTotalList = initTotalList(props);
		console.log("needTotalList:",needTotalList)
		this.state= {
			selectedRowKeys: [],
			needTotalList: needTotalList
		}

	}
	static getDerivedStateFromProps(nextProps){
		console.log("getDerivedStateFromProps:::::",nextProps)
		return null;
	}
	componentDidMount(){
		const {dispatch} = this.props
		dispatch(getRules({url:'/rule/list',data:{pageSize:5}}))
	}
	handleTableChange=(pagination, filters, sorter)=>{
		console.log("pagination:",pagination, "filters:",filters, "sorter:",sorter)
		let params = {
			pageSize: pagination.pageSize,
			currentPage:pagination.current
		}
		if(sorter.field){
			params.price = `${sorter.field}_${sorter.order}`
		}
		if(sorter.num){
			params.num = `${sorter.field}_${sorter.order}`
		}
		this.props.dispatch(getRules({url:'/rule/list',data:params}))
	}
	render(){
		const {goodsData:{list,pagination}} = this.props;
		console.log("this.props:::",this.props);

		// rowSelection object indicates the need for row selection
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
				let {needTotalList} = this.state;
				// needTotalList.total = selectedRows.reduce((sum,val)=>sum+parseInt(val),0);
				for(let key in needTotalList){
					console.log("key:",key,"needTotalList.key:",needTotalList[key])
					needTotalList[key] = {
						...needTotalList[key],
						total:key!=='price'?selectedRows.reduce((sum,val)=>sum+parseInt(val[key]),0):selectedRows.reduce((sum,val)=>sum+(parseInt(val[key])*parseInt(val.num)),0)
					}
				}
				console.log("needTotalList:::",needTotalList)
				this.setState({
					selectedRowKeys:selectedRows,
					needTotalList:needTotalList
				})
			},
			getCheckboxProps: record => ({
				disabled: record.name === 'Disabled User', // Column configuration not to be checked
				name: record.name,
			}),
		};

		console.log("this.state::",this.state)
		const {selectedRowKeys,needTotalList} = this.state;
		return (
			<PageHeaderWrapper title='基础详情页'>
				<Card>
					<div className='description-list'>
						<h2>退款申请</h2>
						<ul className='list'>
							<li>
								<label>取货单号：</label><span>付小小</span>
							</li>
							<li>
								<label>状态：</label><span>付小小</span>
							</li>
							<li>
								<label>销售单号：</label><span>付小小</span>
							</li>
							<li>
								<label>子订单：</label><span>付小小</span>
							</li>
						</ul>
						<Divider style={{marginBottom:32}}/>
						<h2>用户信息</h2>
						<ul className='list'>
							<li>
								<label>用户姓名：</label><span>付小小</span>
							</li>
							<li>
								<label>联系电话：</label><span>付小小</span>
							</li>
							<li>
								<label>常用快递：</label><span>付小小</span>
							</li>
							<li>
								<label>取货地址：</label><span>付小小</span>
							</li>
							<li>
								<label>备注：</label><span>付小小</span>
							</li>
						</ul>
						<Divider style={{marginBottom:32}}/>
						<h2>退货商品</h2>
						{selectedRowKeys.length
							?<Alert
								closable
								message={
									<Fragment>
										<em className='f14 red plr-xs'>已选退货商品：{selectedRowKeys.length}项</em>
										<em className='f14 red plr-xs'>总数量：{needTotalList.num.total}件</em>
										<em className='f14 red plr-xs'>总金额：{needTotalList.price.render?needTotalList.price.render(needTotalList.price.total):needTotalList.price.total}</em>
									</Fragment>
								}
							/>
							:null
						}
						<Table
							rowSelection={rowSelection}
							columns={goodsColumns}
							dataSource={list}
							pagination={pagination}
							onChange={this.handleTableChange}
						/>
						<h2>退货进度</h2>
						<Table
							columns={progressColumns}
							dataSource={list}
							pagination={pagination}
							// onChange={this.handleTableChange}
						/>
					</div>
					<div>基础详情页页面内容</div>
				</Card>
			</PageHeaderWrapper>
		)
	}
}