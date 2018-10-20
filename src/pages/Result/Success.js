import {Fragment} from 'react'
import {Card,Button,Row,Col,Steps,Icon} from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import Result from '../../components/Result';
import './style.scss'

const {Step} = Steps;


const extra = (
	<Fragment>
		<h3>项目名称</h3>
		<Row>
			<Col xs={24} sm={12} lg={12} xl={6}><span>项目ID:</span>2323232</Col>
			<Col xs={24} sm={12} lg={12} xl={6}><span>负责人：</span>张三</Col>
			<Col xs={24} sm={12} lg={12} xl={12}><span>生效时间：</span>2016-12-12 ~ 2017-12-12</Col>
		</Row>
		<Steps current={1} progressDot>
			<Step title='创建项目' description={
				<div>
					<span>曲丽丽</span>
					<Icon type='dingding-o'/>
					<div>2016-12-12 12:32</div>
				</div>

			}/>
			<Step title='部门初审' description={
				<div>
					<div>
						<span>周毛毛</span>
						<Icon type='dingding-o'/>
					</div>
					<div><a href="">催一下</a></div>
				</div>
			}/>
			<Step title='财务复核'/>
			<Step title='完成'/>
		</Steps>
	</Fragment>
)
export default ()=>(
	<PageHeaderWrapper>
		<Card
			bordered={false}
		>
			<Result
				className='success'
				type="success"
				title="提交成功"
				description='提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。'
				extra={extra}
				actions={
					<Fragment>
						<Button type='primary'>返回列表</Button>
						<Button>查看项目</Button>
						<Button>打印</Button>
					</Fragment>
				}
			/>
		</Card>
	</PageHeaderWrapper>
)