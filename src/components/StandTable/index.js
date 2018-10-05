import React,{PureComponent,Fragment} from 'react';

import {Table,Alert} from 'antd';

class StandardTable extends PureComponent{
	constructor(props){
		super(props);

	}
	render(){
		const {
			data:{list,pagination},
			loading,
			columns,
			rowKey,
			selectedRowKeys
		} = this.props;
		const paginationProps = {
			showSizeChanger:true,
			showQuickJumper:true,
			...pagination
		}

		const rowSelection = {
			selectedRowKeys,
			getCheckboxProps:record=>({
				disabled:record.disabled
			})
		}
		console.log("list:",list,"this.props:",this.props)
		return (
			<div className="standardTable">
				<div className="tableAlert">
					<Alert message={"已选择"}/>
				</div>
				<Table
					loading={loading}
					rowKey={rowKey||'key'}
					rowSelection={rowSelection}
					dataSource={list}
					columns={columns}
				/>
			</div>
		)
	}
}


export default StandardTable

