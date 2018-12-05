import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Row,Col,Icon,Card,Tabs,Table,Radio,DatePicker,Tooltip,Menu,Dropdown} from 'antd'
import {FormattedMessage} from 'react-intl'
import numeral from 'numeral';
import GridContent from '../../components/PageHeaderWrapper/GridContent';
import {ChartCard,Field,MiniArea,MiniBar,MiniProgress,Bar,Pie,TimelineChart} from '../../components/Charts'
import NumberInfo from '../../components/NumberInfo'
import Yuan from '../../utils/Yuan';
import Trend from '../../components/Trend'
import {getFakeChart} from "../../redux/ChartRedux";
import {getTimeDistance} from '../../utils';

const {TabPane} = Tabs;
const {RangePicker} = DatePicker;
import './Analysis.scss'

@connect(({chart})=>({
	fakeChart:chart.fakeChart
}))
class Analysis extends Component{
	constructor(props){
		super(props)
		this.rankingListData = [];
		for(let i=0;i<7;i+=1){
			this.rankingListData.push({
				title:`工专路${i}号店`,
				total:Math.floor(Math.random()*99999)
			})
		}
		this.state = {
			salesType: 'all',
			currentTabKey:'',
			loading: true,
			rangePickerValue:getTimeDistance('year')
		}
	}
	componentDidMount(){
		const {dispatch} = this.props;
		dispatch(getFakeChart({
			url:'/charts/fakeData'
		}))
	}
	handleRangePickerChange = rangePickerValue =>{
		console.log("rangePickerValue:",rangePickerValue)
		this.setState({
			rangePickerValue
		})
	}
	selectDate=(type)=>{
		// console.log("type:::::",type,getTimeDistance(type))
		this.setState({
			rangePickerValue:getTimeDistance(type)
		})
	}
	isActive(type){
		const {rangePickerValue} = this.state;
		const value = getTimeDistance(type)
		// console.log("type:::::",type,"value:",value,"rangePickerValue:",rangePickerValue[0].isSame(value[0],'day'),rangePickerValue[1].isSame(value[1],'day'),rangePickerValue)
		if(!rangePickerValue[0]||!rangePickerValue[1]){
			return ''
		}
		// isSame检查两个时间是否相等 当包含第二个参数时，它将匹配所有等于或大于的单位。传入month将检查month和year。传递day将检查day，month和year。
		if(rangePickerValue[0].isSame(value[0],'day') && rangePickerValue[1].isSame(value[1],'day')){
			return 'currentDate'
		}
		return ''

	}
	handleTabChange =(key)=>{
		console.log("key::::",key)
		this.setState({
			currentTabKey:key
		})
	}
	handleChangeSalesType = (e)=>{
		console.log("e:",e)
		let val = e.target.value;
		this.setState({salesType:val})

	}
	render(){
		console.log("this.props::::",this.props)
		const {loading} = this.props;
		const {
			visitData,
			visitData2,
			salesData,
			searchData,
			offlineData = [],
			offlineChartData,
			salesTypeData,
			salesTypeDataOnline,
			salesTypeDataOffline,
		} = this.props.fakeChart;

		const {rangePickerValue,salesType,currentTabKey} = this.state;
		console.log("visitData:",visitData,"rangePickerValue:",rangePickerValue)
		let salesPieData;
		if (salesType === 'all') {
			salesPieData = salesTypeData;
		} else {
			salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
		}
		salesPieData = salesPieData||[];
		console.log("salesPieData：",salesPieData)
		const topColPros = {
			xs: 24,
			sm: 12,
			md: 12,
			lg: 12,
			xl: 6,
			style:{marginBottom:24},
		}
		const salesBarProps = {
			xl:16,
			lg:12,
			md:12,
			sm:24,
			xs:24
		}
		const salesRankProps = {
			xl:8,
			lg:12,
			md:12,
			sm:24,
			xs:24
		}

		const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

		const CustomTab = ({data,currentTabKey:currentKey})=>(
			<Row style={{ width: 138, margin: '8px 0' }}>
				<Col span={12}>
					<NumberInfo
						title={data.name}
						subTitle='转化率'
						total={`${data.cvr * 100}%`}
						theme={currentKey !== data.name && 'light'}
					/>
				</Col>
				<Col span={12} style={{ paddingTop: 36 }}>
					<Pie
						animate={false}
						color={currentKey !== data.name && '#BDE4FF'}
						inner={0.55}
						tooltip={false}
						margin={[0, 0, 0, 0]}
						percent={data.cvr * 100}
						height={64}
					/>
				</Col>
			</Row>
		)
		const iconGroup = (
			<span className="iconGroup">
				<Dropdown
					placement='bottomRight'
					overlay={
						<Menu>
							<Menu.Item>操作一</Menu.Item>
							<Menu.Item>操作二</Menu.Item>
						</Menu>
					}
				>
					<Icon type='ellipsis'/>
				</Dropdown>
			</span>
		)
		return (
			<GridContent className='analysis-wrapper'>
				<Row gutter={24}>
					<Col {...topColPros}>
						<ChartCard
							bordered={false}
							title='总销售额'
							action={
								<Tooltip title={"指标说明"}>
									<Icon type="info-circle-o" className='rt' />
								</Tooltip>
							}
							total={()=><Yuan>126560</Yuan>}
							footer={
								<Field label={<FormattedMessage id='app.analysis.day-sales'/>} value={`￥${numeral(1234).format('0,0')}`}/>
							}
							contentHeight={46}
						>
							<Trend flag='up' className='mr-lg'>
								<FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
								<span className='trendText'>12%</span>
							</Trend>
							<Trend flag='down' className='mr-lg'>
								<FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes" />
								<span className='trendText'>11%</span>
							</Trend>
						</ChartCard>
					</Col>
					<Col {...topColPros}>
						<ChartCard
							bordered={false}
							title='访问量'
							action={
								<Tooltip title='访问量说明'>
									<Icon type='info-circle-o' className='rt'/>
								</Tooltip>
							}
							total={numeral(8848).format('0,0')}
							footer={
								<Field
									label={<FormattedMessage id='app.analysis.day-visits'/>}
									value={numeral(1234).format('0,0')}
								/>
							}
							contentHeight={46}
						>
							<MiniArea color='#975FE4' data={visitData}/>
						</ChartCard>
					</Col>
					<Col {...topColPros}>
						<ChartCard
							title='支付笔数'
							action={
								<Tooltip title='支付笔数说明'>
									<Icon type='info-circle-o' className='rt'/>
								</Tooltip>
							}
							total={numeral(6560).format('0,0')}
							footer={<Field label="转化率" value="60%"/>}
							contentHeight={46}
						>
							<MiniBar data={visitData}/>
						</ChartCard>
					</Col>
					<Col {...topColPros}>
						<ChartCard
							title='运营活动效果'
							action={
								<Tooltip title="营销活动提示">
									<Icon type='info-circle-o' className='rt'/>
								</Tooltip>
							}
							total='78%'
							footer={
								<div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
									<Trend flag='up'>
										<span>周同比</span>
										<span className="trendText">12%</span>
									</Trend>
									<Trend flag='down' className='rt'>
										<span>日同比</span>
										<span className="trendText">11%</span>
									</Trend>
								</div>
							}
							contentHeight={46}
						>
							<MiniProgress percent={67} strokeWidth={8} target={80} color='#13C2C2'/>
						</ChartCard>
					</Col>
				</Row>
				<Card loading={loading} bordered={false} bodyStyle={{padding:0}}>
					<div className="salesCard">
						<Tabs size='large'
							  tabBarExtraContent={
							  	<div className="salesExtraWrap">
									<div className="salesExtra">
										<a className={this.isActive('today')} onClick={()=>this.selectDate('today')}>今日</a>
										<a className={this.isActive('preWeek')} onClick={()=>this.selectDate('preWeek')}>上周</a>
										<a className={this.isActive('week')} onClick={()=>this.selectDate('week')}><FormattedMessage id='app.analysis.all-week' defaultMessage="All Week"/></a>
										<a className={this.isActive('nextWeek')} onClick={()=>this.selectDate('nextWeek')}>下周</a>
										<a className={this.isActive('month')} onClick={()=>this.selectDate('month')}><FormattedMessage id='app.analysis.all-month' defaultMessage="All Month"/></a>
										<a className={this.isActive('year')} onClick={()=>this.selectDate('year')}><FormattedMessage id='app.analysis.all-year' defaultMessage="All Month"/></a>
									</div>
									<RangePicker
										value={rangePickerValue}
										onChange={this.handleRangePickerChange}
										style={{width:256}}
									/>
								</div>
							  }
						>
							<TabPane tab='销售额' key='sales'>
								<Row>
									<Col {...salesBarProps}>
										<div className="salesBar">
											<Bar title='销售趋势' height={295} data={salesData}/>
										</div>
									</Col>
									<Col {...salesRankProps}>
										<div className="salesRank">
											<h4 className='rankingTitle'>门店销售额排名</h4>
											<ul className="rankingList">
												{this.rankingListData.map((item,i)=>(
													<li key={item.title}>
														<span className={`rankingItemNumber ${i<3?'active':''}`}>
															{i+1}
														</span>
														<span className="rankingItemTitle">{item.title}</span>
														<span>{numeral(item.total).format('0,0')}</span>
													</li>
												))}
											</ul>
										</div>
									</Col>
								</Row>
							</TabPane>
							<TabPane tab='访问量' key='views'>
								<Row>
									<Col {...salesBarProps}>
										<div className="salesBar">
											<Bar title='访问量趋势' height={295} data={salesData}/>
										</div>
									</Col>
									<Col {...salesRankProps}>
										<div className="salesRank">
											<h4 className='rankingTitle'>门店访问量排名</h4>
											<ul className="rankingList">
												{this.rankingListData.map((item,i)=>(
													<li key={item.title}>
														<span className={`rankingItemNumber ${i<3?'active':''}`}>
															{i+1}
														</span>
														<span className="rankingItemTitle">{item.title}</span>
														<span>{numeral(item.total).format('0,0')}</span>
													</li>
												))}
											</ul>
										</div>
									</Col>
								</Row>
							</TabPane>
						</Tabs>
					</div>
				</Card>
				<Row  gutter={24} className='mt-lg salesCard'>
					<Col xl={12} lg={24} md={24} xs={24}>
						<Card
							title='线上热门搜索'
							extra={iconGroup}

						>
							<Row gutter={68} className='mb-md'>
								<Col sm={12} xs={24} span={20}>
									<NumberInfo
										subTitle={
											<span>
											搜索用户数
											<Tooltip title='搜索指示说明'>
												<Icon type='info-circle-o' className='ml-md'/>
											</Tooltip>
										</span>
										}
										gap={8}
										total={numeral(12321).format('0,0')}
										status='up'
										subTotal={17.1}
									/>
									<MiniArea line height={45} data={visitData2}/>
								</Col>
								<Col sm={12} xs={24}>
									<NumberInfo
										subTitle={
											<span>
											人均搜索次数
											<Tooltip title='搜索指示说明'>
												<Icon type='info-circle-o' className='ml-md'/>
											</Tooltip>
										</span>
										}
										gap={8}
										total={2.7}
										status='down'
										subTotal={26.2}
									/>
									<MiniArea line height={45} data={visitData2}/>
								</Col>
							</Row>
							<Table
								rowKey={record=>record.index}
								size='small'
								dataSource={searchData}
								columns={[
									{
										title:'排名',
										dataIndex:'index'
									},
									{
										title:'搜索关键词',
										dataIndex:'keyword'
									},
									{
										title:'用户数',
										dataIndex:'count',
										sorter:(a,b)=>a.count-b.count
									},
									{
										title:'周涨幅',
										dataIndex:'range',
										sorter:(a,b)=>a.range - b.range,
										render:(text,record)=>(
											<Trend flag={record.status===1?'down':'up'}>
												<span>{text}%</span>
											</Trend>
										)
									}
								]}
								pagination={{
									pageSize:5
								}}


							/>

						</Card>

					</Col>
					<Col xl={12} lg={24} md={24} sm={24} xs={24} >
						<Card
							title='销售额类别占比'
							extra={
								<div className="salesCardExtra">
									{iconGroup}
									<div className="salesTypeRadio">
										<Radio.Group value={salesType} onChange={this.handleChangeSalesType}>
											<Radio.Button value='all'>全部渠道</Radio.Button>
											<Radio.Button value='online'>线上</Radio.Button>
											<Radio.Button value='stores'>门店</Radio.Button>
										</Radio.Group>
									</div>
								</div>
							}
						>
							<h4 className='mb-lg'>销售额</h4>
							<Pie
								hasLegend
								subTitle='销售额'
								total={() => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
								data={salesPieData}
								valueFormat={value => <Yuan>{value}</Yuan>}
								height={248}
								lineWidth={4}
							/>
						</Card>
					</Col>
				</Row>
				<Card
					className='offlineCard mt-lg'
					bordered={false}
				>
					<Tabs activeKey={activeKey} onChange={this.handleTabChange}>
						{offlineData.map((item,index)=>(
							<TabPane tab={<CustomTab data={item} currentTabKey={activeKey} />} key={item.name}>
								<div>{item.cvr}</div>
								<TimelineChart
									height={400}
									data={offlineChartData}
									titleMap={{
										y1:"客流量",
										y2:"支付笔数"
									}}
								/>
							</TabPane>
						))}
					</Tabs>
				</Card>
			</GridContent>

		)
	}
}

export default Analysis;