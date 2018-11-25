import {Button,Form,Input,Select,Upload,Icon,Modal,message} from 'antd';
import {connect} from 'react-redux';
import {Fragment} from "react";
import PhoneView from '../../../components/PhoneView'
import './index.scss'
import {handleBasic} from '../../../redux/FormRedux';

const FormItem = Form.Item;

const AvatarView = ({
		avatar,
		fileList,
		handleChange,
		beforeUpload,
		previewVisible,
		previewImage,
		handlePreview,
		handleCancel,
		handleRemove,

}) =>(
	<Fragment>
		<div className="avatar_title">头像</div>
		<div className="avatar">
			<img src={avatar} alt='avatar'/>
		</div>
		<Upload
			// listType="picture-card"
			// fileList={fileList}
			action='/uploadFile'
			onChange={handleChange}
			onPreview = {handlePreview}
			beforeUpload = {beforeUpload}
			onRemove  = {handleRemove}
		>
		{
			fileList.length>=3
				?null:
				<div className="button_view">
					<Button icon="upload">
						更换头像
					</Button>
				</div>
		}
		</Upload>
		<Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
			<img src={previewImage} style={{width:'100%'}}/>
		</Modal>
	</Fragment>
)
const validatorPhone = (rule, value, callback) => {
	const values = value&&value.split('-')||[];
	if (!values[0]) {
		callback('Please input your area code!');
	}
	if (!values[1]) {
		callback('Please input your phone number!');
	}
	callback();
};
@connect(({form})=>({
	data:form.step
}))
@Form.create()
export default class BasicView extends React.Component{
	constructor(props){
		super(props);
		console.log("BasicView-this.props1::",this.props)
		this.state={
			previewVisible:false,
			previewImage:'',
			fileList: [{
				uid: '-1',
				name: 'xxx.png',
				status: 'done',
				url: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
			}],
		}
	}
	componentDidMount(){

	}
	getAvatarURL(){
		const {currentUser} = this.props;
		if(currentUser&&currentUser.avatar){
			return currentUser.avatar
		}
		const {fileList} = this.state;
		console.log("getAvatarURL:",fileList)
		// const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
		let response = fileList[fileList.length-1].response; //返回数据
		const url = fileList[fileList.length-1].url||response&&response.file;
		return url
	}
	handleSubmit = e=>{
		e.preventDefault();
		const {dispatch,form} = this.props;
		form.validateFields((err,values)=>{
			console.log("err:",err,"values:::",values)
			if(!err){
				dispatch(handleBasic({url:'/form',method:'POST',data:values}))
				.then(json=>{
					console.log("json::::",json)
					if(json.success){
						message.success("基本信息提交成功")
					}else{
						message.error("基本信息提交失败")
					}
				})
			}
		})
	}
	handlePhoneChange = value=>{
		console.log("handlePhoneChange:",value)
		this.props.form.setFieldsValue({
			phone:value
		})
	}
	handleChange=({ file, fileList })=>{
		console.log("onChange-file:",file)
		console.log("fileList::::1",fileList)
		//文件有上传
		let newFileList = fileList.filter(file => {
			console.log("file::::::,",file)
			return file&&file.response
		});
		newFileList = [...this.state.fileList,...newFileList]
		console.log("fileList::::2",newFileList)
		this.setState({fileList: newFileList});
		return newFileList;
		// this.setState({fileList})
	}
	handlePreview = (file)=>{
		console.log("handlePreview-file::::",file)
		this.setState({
			previewImage: file.url || file.thumbUrl||file.response&&file.response.file,
			previewVisible: true,
		});
	}
	handleCancel = ()=>{
		this.setState({
			previewVisible:false
		})
	}
	handleRemove =(f)=>{
		console.log("f:",f)
		let fileList = this.state.fileList.filter(file=>{
			return file.uid==f.uid
		})
		this.setState({fileList})
	}
	beforeUpload =(file)=>{
		const maxFileSize = 0.2;
		if (maxFileSize) {
			const isLtMax = file.size / 1024 / 1024 < maxFileSize;
			if (!isLtMax) {
				message.error(`文件大小超过${maxFileSize}M限制`);
			}
			return isLtMax;
		}
	}
	render(){
		const {
			form:{getFieldDecorator}
		} = this.props
		const {fileList,previewVisible,previewImage} = this.state;
		console.log("getAvatarURL():",this.getAvatarURL())
		return (
			<div className='base-view'>
				<div className="view-left">
					<Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
						<FormItem label="邮箱">
							{getFieldDecorator('email',{
								initialValue:'alipay@qq.com',
								rules:[
									{required:true,message:'请输入邮箱'}
								]
							})(<Input/>)}
						</FormItem>
						<FormItem label="昵称">
							{getFieldDecorator('name',{
								initialValue:'张三',
								rules:[
									{required:true,message:'请输入邮箱'}
								]
							})(<Input/>)}
						</FormItem>
						<FormItem label="个人简介">
							{getFieldDecorator('profile',{
								initialValue:'2015年北京戏剧学院毕业',
								rules:[
									{required:true,message:'请输入个人简介'}
								]
							})(
								<Input.TextArea
									prefixCls='col-24'
									placeholder="个人简介"
									rows={4}
								/>
							)}
						</FormItem>
						<FormItem label="国家/地区">
							{getFieldDecorator('country',{
								rules:[
									{required:true,message:'请选择地区'}
								]
							})(
								<Select placeholder="请选择地区">
									<Select.Option value='china'>中国</Select.Option>
									<Select.Option value='UAS'>美国</Select.Option>
								</Select>
							)}
						</FormItem>
						<FormItem label="所在省市">

						</FormItem>
						<FormItem label="街道地址">
							{getFieldDecorator('address',{
								rules:[
									{required: true,message:'请输入街道地址!'}
								]
							})(
								<Input placeholder='请输入街道地址'/>
							)}
						</FormItem>
						<FormItem label="联系电话">
							{getFieldDecorator('phone',{
								initialValue:'0755-66668888',
								rules:[
									{required:true,message:'请输入电话'},
									{validator:validatorPhone}
								]
							})(
								<PhoneView onChange={this.handlePhoneChange} />
							)}
						</FormItem>
						<Button type='primary' htmlType='submit'>更新基本信息</Button>
					</Form>
				</div>
				<div className="view-right">
					<AvatarView
						fileList={fileList}
						previewImage={previewImage}
						previewVisible={previewVisible}
						avatar={this.getAvatarURL()}
						handleChange={this.handleChange}
						handlePreview={this.handlePreview}
						handleCancel={this.handleCancel}
						beforeUpload={this.beforeUpload}
						handleRemove={this.handleRemove}
					/>
				</div>
			</div>
		)
	}
}
