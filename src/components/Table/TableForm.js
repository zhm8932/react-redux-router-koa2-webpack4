import React,{PureComponent} from 'react';
import {Table,Button,Input,message,Popconfirm,Divider} from 'antd'

export default class TableForm extends PureComponent{
	index = 0;
	cacheOriginData = {};
	constructor(props){
		super(props);
		this.state={
			data:props.value,
			loading:false,
			value:props.value
		}
		console.log("this.state:",this.state)
	}
	getRowByKey(key,newData){
		const {data} =  this.state;
		return (newData||data).filter(item=>item.key===key)[0];
	}
	toggleEditable(e,key){
		e.preventDefault();
		const {data} = this.state;
		const newData = data.map(item=>({...item}))
		const target = this.getRowByKey(key,newData)
		if(target){
			// 进入编辑状态时保存原始数据
			if(!target.editable){
				this.cacheOriginData[key] = target;
			}
			console.log("this.cacheOriginData:",this.cacheOriginData)
			target.editable = !target.editable;
			this.setState({data:newData});
		}
	}
	remove(key){
		const {data} = this.state;
		const {onChange} = this.props;
		console.log("key:",key,"data:",data)
		const newData = data.filter(item=>item.key!==key);
		this.setState({data:newData});
		onChange(newData);
	}
	handleFieldChange(e,fieleName,key){
		const {data} = this.state;
		// console.log("data:",data)
		const newData = data.map(item=>({...item}));
		const target = this.getRowByKey(key,newData);
		if(target) {
			target[fieleName] = e.target.value;
			// console.log("target:", target)
			// console.log("newData:", newData)
			this.setState({data:newData});
		}
	}
	saveRow(e,key){
		this.setState({loading:true})

		setTimeout(()=>{
			const target = this.getRowByKey(key);
			if(!target.workId||!target.name||!target.department){
				message.error('请填写完整的成员信息。');
				this.setState({loading:false})
				return;
			}

			this.toggleEditable(e,key);
			const {onChange} = this.props;
			const {data} = this.state;
			console.log("data---:",data)

			this.setState({loading:false})
		},500)
	}
	cancel(e,key){
		e.preventDefault();
		const {data} = this.state;
		const newData = data.map(item=>({...item}));
		const target = this.getRowByKey(key,newData);

		console.log("cancel---target1:",target)
		//还原修改的值
		if(this.cacheOriginData[key]){
			Object.assign(target,this.cacheOriginData[key]);
			delete this.cacheOriginData[key]
		}
		target.editable = false;
		console.log("cancel---target2:",target)
		this.setState({data:newData});
	}
	newMember(){
		const {data} = this.state;
		const newData = data.map(item=>({...item}));
		newData.push({
			key:`NEW_TEMP_ID_${this.index}`,
			workId:'',
			name: '',
			department: '',
			editable:true,
			isNew :true,
		})
		this.index+=1;
		this.setState({data:newData});
	}
	render(){
		console.log("this.props:---:",this.props);
		const columns =  [
			{
				title:'成员姓名',
				dataIndex:'name',
				key:'name',
				render:(text,record)=>{
					// console.log("text:",text,"record",record)
					if(record.editable){
						return(
							<Input
								value={text}
								onChange={e=>this.handleFieldChange(e,'name',record.key)}
								placeholder="成员姓名"
							/>
						)
					}
					return text;
				}
			},{
				title:'工号',
				dataIndex: 'workId',
				key:'workId',
				render:(text,record)=>{
					if(record.editable){
						return (
							<Input
								value={text}
								onChange={e=>this.handleFieldChange(e,'workId',record.key)}
								placeholder="工号"
							/>
						)
					}
					return text;
				}
			},{
				title:'所属部门',
				dataIndex:'department',
				key:'department',
				render:(text,record)=>{
					if(record.editable){
						return (
							<Input
								value={text}
								placeholder="请填写所属部门"
								onChange={e=>this.handleFieldChange(e,'department',record.key)}
							/>
						)
					}
					return text
				}
			},{
				title:'操作',
				key:'action',
				render:(text,record)=>{
					// console.log("text:",text,"record:",record)
					const {loading} = this.state;
					if(!!record.editable&&loading){

					}

					if(record.editable){
						if(record.isNew){
							return (
								<span>
									<a onClick={e=>this.saveRow(e,record.key)}>添加</a>
									<Divider type="vertical"/>
									<Popconfirm title="是否要删除此行?" onConfirm={()=>this.remove(record.key)}>
										<a>删除</a>
									</Popconfirm>
								</span>
							)
						}
						return (
							<span>
								<a onClick={e=>{this.saveRow(e,record.key)}}>保存</a>
								<Divider type="vertical" />
								<a onClick={e=>{this.cancel(e,record.key)}}>取消</a>
							</span>
						)
					}
					return (
						<span>
							<a onClick={e=>this.toggleEditable(e,record.key)}>编辑</a>
							<Divider type="vertical" />
							<Popconfirm title="是否要删除此行？" onConfirm={()=>this.remove(record.key)}>
								<a>删除</a>
							</Popconfirm>
						</span>
					)
				}
			}
		]
		const {loading,data} = this.state
		return (
			<React.Fragment>
				<Table
					loading={loading}
					columns={columns}
					dataSource={data}
					pagination={false}
				/>
				<Button
					style={{marginTop:16,width:'100%'}}
					type='dashed'
					icon='plus'
					onClick={()=>this.newMember()}
				>
					新增成员
				</Button>
			</React.Fragment>
		)
	}
}