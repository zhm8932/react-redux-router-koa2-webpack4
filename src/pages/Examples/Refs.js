import React,{PureComponent} from 'react';
import {Row,Col,Card,Input,Button} from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper'


function MyFunctionalComponent() {
	return <Input/>;
}

class Refs extends PureComponent{
	constructor(props){
		super(props)
		//创建ref 存储textInput Dom元素
		this.textInput = React.createRef();
		this.textInput4 = React.createRef();
		// this.focusTextInput = this.focusTextInput.bind(this);
	}
	componentDidMount(){
		this.focusTextInput3();
	}
	// 在这里使用箭头函数就可以把方法绑定给实例：
	focusTextInput=()=>{
		console.log("focusTextInput:",this.textInput,this.textInput.current.input.value)
		this.textInput.current.focus()
	}
	focusTextInput2=()=>{
		console.log("this.textInput2:",this.textInput2,this.textInput2.input.value)
		this.textInput2.focus();
		//添加className
		this.textInput2.input.className += ' XXXXXXXXXXXXXX';
	}
	focusTextInput3=()=>{
		this.textInput3.focus()
	}
	handleSubmit6=(e)=>{
		e.preventDefault();
		console.log("value:",this.textInput6.value,this.textInput6.input.value);
		console.log('A name was submitted: ' + this.input.value);
	}
	render(){
		//告诉React 我们想把<input>ref关联到构造器里创建的`textInput`上
		//不能在函数式组件上使用 ref 属性
		return (
			<PageHeaderWrapper>
				<Card>
					<Row gutter={24} className='mb-lg'>
						<Col span={8}>
							<Input ref={this.textInput} placeholder="请输入"/>
							<Button type='primary' block className='mt-lg' onClick={this.focusTextInput}>Focus the text input</Button>
						</Col>
						{/*回调 Refs*/}
						<Col span={8}>
							<Input ref={input=> this.textInput2 = input} placeholder="请输入2"/>
							<Button type='primary' block className='mt-lg' onClick={this.focusTextInput2}>Focus the text input</Button>
						</Col>
						<Col span={8}>
							<Input ref={input => this.textInput3 = input} placeholder="请输入3"/>
							<Button type='primary' block className='mt-lg' onClick={this.focusTextInput3}>Focus the text input</Button>
						</Col>
					</Row>
					<Row gutter={24}>
						<Col span={8}>
							<MyFunctionalComponent ref={this.textInput4}/>
						</Col>
						<Col span={8}>
							<form onSubmit={this.handleSubmit6}>
								<input type="text" ref={(input) => this.input = input} />
								<Input type="text" ref={(input)=> this.textInput6=input}/>
								<Input type='submit' value='submit'/>
							</form>
						</Col>
					</Row>
				</Card>
			</PageHeaderWrapper>
		)
	}
}

export default Refs