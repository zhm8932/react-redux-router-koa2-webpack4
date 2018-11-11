import React, {Fragment, PureComponent} from 'react'
import {Card,Row,Col,Button,Dropdown,Icon,Menu,Steps,Popover,Tooltip,Badge,Divider,Table} from 'antd'
import {connect} from 'react-redux';
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
import DescriptionList from '../../components/DescriptionList';
const {Description} = DescriptionList;
const {Step} = Steps;
const ButtonGroup = Button.Group;
import './advanceProfile.scss'
import {getRules} from '../../redux/ListRedux'
import {formatDate} from "../../utils";


const action = (
	<Fragment>
		<ButtonGroup>
			<Button>同意</Button>
			<Button>拒绝</Button>
			<Dropdown overlay={
				<Menu>
					<Menu.Item key='1'>选项一</Menu.Item>
					<Menu.Item key='2'>选项二</Menu.Item>
					<Menu.Item key='3'>选项三</Menu.Item>
				</Menu>
			}>
				<Button>
					<Icon type='ellipsis'/>
				</Button>
			</Dropdown>
		</ButtonGroup>
		<Button type='primary'>主操作</Button>
	</Fragment>
)
const description = (
	<DescriptionList col={2}>
		<Description term="创建人">曲丽丽</Description>
		<Description term="订购产品">XX 服务</Description>
		<Description term="创建时间">2017-07-07</Description>
		<Description term="关联单据">
			<a href="">12421</a>
		</Description>
		<Description term="生效日期">2017-07-07 ~ 2017-08-08</Description>
		<Description term="备注">请于两个工作日内确认</Description>
	</DescriptionList>
)

const extra = (
	<Row>
		<Col xs={24} sm={12}>
			<div className='text-secondary'>状态</div>
			<div className='heading'>待审批</div>
		</Col>
		<Col xs={24} sm={12}>
			<div className='text-secondary'>订单金额</div>
			<div className='heading'>¥ 568.08</div>
		</Col>
	</Row>
)

const tabList = [
	{key:'detail',tab:'详情'},
	{key:'rule',tab:'规则'},
]

const operationTabList = [
	{key:'tab_1',tab:'操作日志一'},
	{key:'tab_2',tab:'操作日志二'},
	{key:'tab_3',tab:'操作日志三'},
]

const columns = [
	{title:'操作类型',dataIndex:'type',key: 'type'},
	{title:'操作人',dataIndex:'owner',key: 'owner'},
	{title:'执行结果',dataIndex:'status',key: 'status',render:val=><Badge status={statusMap[val]} text={status[val]}/>},
	{title:'操作时间',dataIndex:'updatedAt',key: 'updatedAt',render:val=>formatDate(val,'YYYY-MM-DD hh:mm:ss')},
	{title:'备注',dataIndex:'desc',key: 'desc'},
]

const statusMap = ['default', 'processing','success','error','processing', 'success','processing', 'error'];
const status 	= ['关闭', '运行中', '已上线', '异常','运行中','已上线','运行中','异常',];
const customDot = (dot,{status})=>{
	// console.log("dot:::",dot,"status:::",status)
	return status ==='process'
		? (
			<Popover
				content={
						 <div style={{width:'160px'}}>
							吴加号
							 <span className='text-secondary rt'>
								 <Badge status='default' text={<span className='text-secondary'>未响应</span>} />
							 </span>
							 <p className="text-secondary">
								 耗时：2小时25分
							 </p>
						 </div>
					 }
			>
				{dot}
			</Popover>
		):( dot )


}

@connect(({list})=>({
	rule:list.rule
}))
export default class BasicProfile extends PureComponent{
	state = {
		operationkey:'tab_1',
	};
	componentDidMount(){
		const {dispatch} = this.props;
		dispatch(getRules({url:'/rule/list',data:{pageSize:6,isPaging:true}}))
	}
	onOperationTabChange =(key)=>{
		console.log("key:",key)
		let currentPage = key&&key.split('_')[1]||1;
		const {dispatch} = this.props;
		this.setState({operationkey:key})
		dispatch(getRules({url:'/rule/list',data:{pageSize:6-currentPage,currentPage,isPaging:true}}))
	}
	render(){
		const {operationkey} = this.state;
		const {
			loading,
			rule:{list:data}
		} = this.props;
		console.log("data:::::",data,"this.props:::",this.props)
		const contentList = {
			tab_1:(
				<Table
					pagination={false}
					columns={columns}
					dataSource={data}
				/>
			),
			tab_2:(
				<Table
					pagination={false}
					columns={columns}
					dataSource={data}
				/>
			),
			tab_3:(
				<Table
					pagination={false}
					columns={columns}
					dataSource={data}
				/>
			),
		}
		return (
			<PageHeaderWrapper
				title="单号：234231029431"
				logo={
					<img src='https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png'/>
				}
				action={action}
				content={description}
				extraContent={extra}
				tabList={tabList}
			>
				<Card title='流程进度' className='mb-xs'>
					<Steps current={1} progressDot={customDot}>
						<Step title='创建项目' description={
							<div className="text-secondary">
								曲丽丽
								<Icon type='dingding-o' className='ml-xs'/>
								<p>2016-12-12 12:32</p>
							</div>
						}/>
						<Step title='部门初审' description={
							<div className="text-secondary">
								周毛毛
								<Icon type='dingding-o' className='ml-xs'/>
								<p><a>催一下</a></p>

							</div>
						}/>
						<Step title='财务复核'/>
						<Step title='完成'/>
					</Steps>
				</Card>
				<Card title='用户信息' className='mb-xs'>
					<DescriptionList className='mb-md'>
						<Description term='用户行'>付小霞</Description>
						<Description term='会员卡号'>32943898021309809423</Description>
						<Description term='身份证'>3321944288191034921</Description>
						<Description term='联系方式'><a href='tel:18112345678'>18112345678</a></Description>
						<Description term='联系地址'>曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口</Description>
					</DescriptionList>
					<DescriptionList title='信息组'>
						<Description term='某某数据'>777</Description>
						<Description term='该数据更新时间'>2017-08-08</Description>
						<Description>&nbsp;</Description>
						<Description term={
							<span>
								某某数据
								<Tooltip title='数据说明'>
									<Icon type='info-circle-o' className='ml-ss'/>
								</Tooltip>
							</span>
						}>8888888888</Description>
						<Description term='该数据更新时间'>2017-08-08</Description>
					</DescriptionList>
					<h4 className='mtb-md'>信息组</h4>
					<Card title='多层级信息组' type='inner' className='mb-xs'>
						<DescriptionList title='组名称2'>
							<Description term='负责人'>林东东</Description>
							<Description term='角色码'>12344555</Description>
							<Description term='所属部门'>XX公司 - YY部</Description>
							<Description term='过期时间'>2017-08-08</Description>
							<Description term='描述'>
								这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...
							</Description>
						</DescriptionList>
						<Divider className='mtb-md'/>
						<DescriptionList title='组名称3' col={1}>
							<Description term='学名'>Citrullus lanatus (Thunb.) Matsum. et
								Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..</Description>
						</DescriptionList>
						<DescriptionList title='组名称4'>
							<Description term='负责人'>付小小</Description>
							<Description term='角色码'>1234568</Description>
						</DescriptionList>

					</Card>
				</Card>
				<Card title='用户近半年来电记录' className='mb-xs'>
					<div className='noData'>
						<Icon type='frown' className='mlr-xs'/>
						暂无数据
					</div>
				</Card>
				<Card
					className='tabsCard'
					bordered={false}
					tabList={operationTabList}
					onTabChange={this.onOperationTabChange}
				>
					<div>{contentList[operationkey]}</div>
				</Card>
			</PageHeaderWrapper>
		)
	}
}