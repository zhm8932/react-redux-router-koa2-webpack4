import {Card,Icon,Button} from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import Result from '../../components/Result';

export default ()=>(
	<PageHeaderWrapper>
		<Card
			bordered={false}
		>
			<Result
				type="error"
				title="提交失败"
				description="请核对并修改以下信息后，再重新提交。"
				extra={
					<div>
						<h4 className='f16 mb-md'>您提交的内容有如下错误：</h4>
						<p><Icon type="close-circle" className='mr-xs red'/>您的账户已被冻结立即解冻</p>
						<p><Icon type="close-circle" className='mr-xs red'/>您的账户还不具备申请资格立即升级</p>
					</div>
				}
				actions={
					<Button type='primary'>返回修改</Button>
				}
			/>
		</Card>
	</PageHeaderWrapper>
)