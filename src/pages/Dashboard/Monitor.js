import React, { Component } from 'react';
import {Row,Col,Card,Tooltip} from 'antd'
import {Gauge,Pie,WaterWave} from '../../components/Charts';
import NumberInfo from '../../components/NumberInfo'
import ActiveChart from '../../components/ActiveChart'
import GridContent from '../../components/PageHeaderWrapper/GridContent'
import CountDown from '../../components/CountDown'
import numeral from 'numeral'

const targetTime = new Date().getTime() + 3900000;
console.log("targetTime:",targetTime)
class Monitor extends Component{
	render(){
		return (
			<GridContent>
				<Row gutter={24}>
					<Col xl={18}>
						<Card title="活动实时交易情况">
							<Col md={6} sm={12} xs={24}>
								<NumberInfo subTitle="今日交易总额" suffix="元" total={numeral(124543233).format('0,0')}/>
							</Col>
							<Col md={6} sm={12} xs={24}>
								<NumberInfo subTitle="销售目标完成率" suffix="%" total={92}/>
							</Col>
							<Col md={6} sm={12} xs={24}>
								<NumberInfo subTitle="活动剩余时间" total={<CountDown target={targetTime}/>}/>
							</Col>
							<Col md={6} sm={12} xs={24}>
								<NumberInfo subTitle="每秒交易总额" suffix="元" total={numeral(234).format('0,0')}/>
							</Col>
						</Card>
					</Col>
					<Col xl={6}>
						<Card title="活动情况预测" className='mb-lg'  bordered={false}>
							<ActiveChart/>
						</Card>
						<Card title='券核效率' bordered={false}>
							<Gauge title="跳出率" height={180} percent={87} />
						</Card>
					</Col>
				</Row>
				<Row gutter={24} className='mt-lg'>
					<Col lg={12}>
						<Card title='各品类占比' bordered={false}>
							<Col span={8}>
								<Pie
									percent={28}
									subTitle='中式快餐'
									total='20%'
									height={128}
									lineWidth={2}
								/>
							</Col>
							<Col span={8}>
								<Pie
									percent={35}
									subTitle='西餐'
									total='30%'
									height={128}
									color='#5DDECF'
									lineWidth={2}
								/>
							</Col>
							<Col span={8}>
								<Pie
									// tooltip={true}
									percent={48}
									subTitle='火锅'
									total='40%'
									height={128}
									color='#2FC25B'
									lineWidth={2}
								/>
							</Col>
						</Card>
					</Col>
					<Col lg={6}>
						<Card title='热门搜索' bordered={false}>
							22222222
						</Card>
					</Col>
					<Col lg={6}>
						<Card title='资源剩余' bordered={false} className='tc'>
							<WaterWave title='补贴资金剩余' height={161} percent={40}/>
						</Card>
					</Col>
				</Row>
			</GridContent>
		)
	}
}

export default Monitor;