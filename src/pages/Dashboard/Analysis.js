import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Row,Col,Icon,Card,Tabs,Table,Radio,DatePicker,Tooltip,Menu,Dropdown} from 'antd'
import {FormattedMessage} from 'react-intl'
import numeral from 'numeral';
import GridContent from '../../components/PageHeaderWrapper/GridContent';
import {ChartCard,Field,MiniArea,MiniBar,MiniProgress} from '../../components/Charts'
import Yuan from '../../utils/Yuan';
import Trend from '../../components/Trend'
import {getFakeChart} from "../../redux/ChartRedux";

const {TabPane} = Tabs;
const {RangePicker} = DatePicker;
import './Analysis.scss'

@connect(({chart})=>({
	fakeChart:chart.fakeChart
}))
class Analysis extends Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		const {dispatch} = this.props;
		dispatch(getFakeChart({
			url:'/charts/fakeData'
		}))
	}
	render(){
		console.log("this.props::::",this.props)
		const {loading} = this.props;
		const {
			visitData,
			visitData2,
			salesData,
			searchData,
			offlineData,
			offlineChartData,
			salesTypeData,
			salesTypeDataOnline,
			salesTypeDataOffline,
		} = this.props.fakeChart;
		console.log("visitData:",visitData)
		const topColPros = {
			xs: 24,
			sm: 12,
			md: 12,
			lg: 12,
			xl: 6,
			style:{marginBottom:24},
		}
		return (
			<GridContent className='analysis-wrappe11111111111r'>
				<Row gutter={24} className='analysis-wrapper'>
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
									额外内容
								</div>
							  }
						>
							<TabPane tab='销售额' key='sales'>
								<div>11111111111</div>
							</TabPane>
							<TabPane tab='访问量' key='views'>
								<div>222222222</div>
							</TabPane>
						</Tabs>
					</div>
				</Card>
			</GridContent>

		)
	}
}

export default Analysis;