import {Card} from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import Result from '../../components/Result';

export default ()=>(
	<PageHeaderWrapper>
		<Card
			bordered={false}
		>
			<Result
				type="error"
			/>
		</Card>
	</PageHeaderWrapper>
)