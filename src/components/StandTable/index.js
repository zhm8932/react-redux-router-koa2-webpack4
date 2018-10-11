import React,{PureComponent,Fragment} from 'react';

import {Table,Alert} from 'antd';

function initTotalList(columns) {
	const totalList = [];
	columns.forEach(column => {
		if (column.needTotal) {
			totalList.push({ ...column, total: 0 });
		}
	});
	console.log("totalList:",totalList)
	return totalList;
}


class StandardTable extends PureComponent{
	constructor(props){
		super(props);
		console.log("StandardTable-props:",props)
		const {columns} = props;
		const needTotalList =  initTotalList(columns);
		this.state = {
			selectedRowKeys:[],
			needTotalList
		}

	}

	static getDerivedStateFromProps(nextProps) {
		// clean state
		console.log("nextProps:::",nextProps)
		if (nextProps.selectedRows.length === 0) {
			const needTotalList = initTotalList(nextProps.columns);

			return {
				selectedRowKeys: [],
				needTotalList,
			};
		}
		return null;
	}
	//处理选择项
	handleRowSelectChange=(selectedRowKeys, selectedRows)=>{
		console.log("this.state---:",this.state)
		let {needTotalList} = this.state;

		needTotalList = needTotalList.map(item => ({
			...item,
			total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
		}));
		const { onSelectRow } = this.props;
		if (onSelectRow) {
			onSelectRow(selectedRows);
		}
		console.log("selectedRowKeys:",selectedRowKeys,"needTotalList:",needTotalList)
		this.setState({ selectedRowKeys, needTotalList });
	}
	handleTableChange=(pagination, filters, sorter)=>{
		console.log("pagination:",pagination,"filters:",filters,"sorter:",sorter)
		const {onChange} = this.props;
		if(onChange){
			onChange(pagination,filters,sorter)
		}
	}
	cleanSelectedKeys=()=>{
		this.handleRowSelectChange([], []);
	}
	render(){
		const {selectedRowKeys,needTotalList} = this.state;
		const {
			data:{list,pagination},
			loading,
			columns,
			rowKey,
		} = this.props;


		const paginationProps = {
			showSizeChanger:true,
			showQuickJumper:true,
			...pagination
		}

		console.log("paginationProps:",paginationProps)
		const rowSelection = {
			selectedRowKeys,
			onChange:this.handleRowSelectChange,
			getCheckboxProps:record=>({
				disabled:record.disabled
			})
		}
		console.log("list:",list,"this.props:",this.props)
		return (
			<div className="standardTable">
				<div className="tableAlert">
					<Alert message={
						<Fragment>
							已选择<a className="blue plr-xs">{selectedRowKeys.length}</a>项
							<span>&nbsp;&nbsp;总计 {needTotalList.map(item=>(
								<span key={item.dataIndex}>
									{item.title}{item.render?item.render(item.total):item.total}
								</span>
							))}</span>
							<a className='blue pl-lg' onClick={this.cleanSelectedKeys}>清空</a>
						</Fragment>
					}/>
				</div>
				<Table
					loading={loading}
					rowKey={rowKey||'key'}
					rowSelection={rowSelection}
					dataSource={list}
					columns={columns}
					pagination={paginationProps}
					onChange={this.handleTableChange}
				/>
			</div>
		)
	}
}


export default StandardTable

