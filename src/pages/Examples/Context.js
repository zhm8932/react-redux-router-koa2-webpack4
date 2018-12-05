import React,{PureComponent,Fragment} from 'react';
import {Row,Col,Card,Button} from 'antd';

/*
Context 设计目的是为共享那些被认为对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。
例如，在下面的代码中，我们通过一个“theme”属性手动调整一个按钮组件的样式
* */
function ThemedButton(props) {
	return <Button htmlType={props.htmlType}>按钮{props.htmlType}</Button>
}


//创建一个 htmlType Context,默认htmlType值为button
const HtmlTypeContext = React.createContext('button');

function ThemedButton2(props) {
	//ThemedButton2 组件从context接收 htmlType
	return(
		<HtmlTypeContext.Consumer>
			{htmlType=><Button {...props} htmlType={htmlType}>按钮[Context]{htmlType}</Button>}
		</HtmlTypeContext.Consumer>
	)
}

//中间组件
/*
*Toolbar 组件必须添加一个额外的	htmlType属性
* 然后将他们传递给ThemedButton 组件
* */

function Toolbar(props) {
	return (
		<div>
			<ThemedButton htmlType={props.htmlType}/>
		</div>
	)
}

//中间件2
function Toolbar2(props) {
	return (
		<div>
			<ThemedButton2/>
		</div>
	)
}


//动态Context
const themes = {
	light: {
		foreground: '#ffffff',
		background: '#222222',
	},
	dark: {
		foreground: '#000000',
		background: '#eeeeee',
	},
}

const ThemeContext = React.createContext(themes.dark); //默认值
function ThemedButton3(props) {
	return (
		<ThemeContext.Consumer>
			{theme =>{
				console.log("theme:",theme)
				return <Button {...props} style={{backgroundColor:theme.background,color:'#FFF'}}>动态按钮</Button>
			}}
		</ThemeContext.Consumer>
	)
}
//一个使用到ThemedButton3组件的中间件
function Toobar3(props) {
	return (
		<ThemedButton3 {...props} onClick={props.changeTheme}>Change Theme</ThemedButton3>
	)
}

/*
传递给函数的 value 将等于组件树中上层 context 的最近的 Provider 的 value 属性。
如果 context 没有 Provider ，那么 value 参数将等于被传递给 createContext() 的 defaultValue
* */

export default class extends PureComponent {
	constructor(props){
		super(props)
		this.state={
			theme:themes.light
		}
	}
	toggleTheme =()=>{
		this.setState({
			theme:this.state.theme===themes.dark?themes.light:themes.dark
		})

		/*this.setState(state => ({
			theme:
				state.theme === themes.dark
					? themes.light
					: themes.dark,
		}));*/
	}
	render(){
		console.log("this.state:",this.state)
		return (
			<Fragment>
				<Card bordered={false} className='mb-lg'>
					<Row>
						<Col span={4}>
							<Toolbar htmlType='reset'/>
						</Col>
						<Col span={4}>
							<HtmlTypeContext.Provider value='submit'>
								<Toolbar2/>
							</HtmlTypeContext.Provider>
						</Col>
					</Row>
				</Card>
				<Card title="动态Context" bordered={false} className='mb-lg'>
					<ThemeContext.Provider value={this.state.theme}>
						<Toobar3 changeTheme={this.toggleTheme}/>
					</ThemeContext.Provider>

				</Card>
			</Fragment>

		)
	}
}