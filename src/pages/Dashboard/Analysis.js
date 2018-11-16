import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Row,Col,Icon,Card,Tabs,Table,Radio,DatePicker,Tooltip,Menu,Dropdown} from 'antd'

import GridContent from '../../components/PageHeaderWrapper/GridContent';
import {ChartCard} from '../../components/Charts'
import Yuan from '../../utils/Yuan';
import {getFakeChart} from "../../redux/ChartRedux";

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
		} = this.props;

		const topColPros = {
			xs: 24,
			sm: 12,
			md: 12,
			lg: 12,
			xl: 6,
			style:{marginBottom:24},
		}
		return (
			<GridContent>
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
						>
							<div>222222222</div>
						</ChartCard>
					</Col>
				</Row>
				<div className="my-box">Analysis内容11111</div>
			</GridContent>

		)
	}
}

export default Analysis;