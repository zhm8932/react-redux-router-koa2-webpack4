import {PureComponent,Fragment} from 'react'
import {Button} from 'antd'
import ErrorBoundary from '../../components/ErrorBoundary'
const Profile = ({ user }) => <div>name: {user.name}</div>;

export default class ErrorDidCatch extends PureComponent{
	constructor(props){
		super(props)
		this.state = {
			user:{
				name:'React'
			},
			user2:{
				name:'React2'
			}
		}
	}
	onClick = ()=>{
		this.setState({
			user:null
		})
	}
	onClick2 = ()=>{
		this.setState({
			user2:null
		})
	}
	render(){
		return (
			<Fragment>
				<ErrorBoundary>
					<Profile user={this.state.user}/>
				</ErrorBoundary>
				<Profile user={this.state.user2}/>
				<Button onClick={this.onClick}>更新-有错误边界</Button>
				<Button onClick={this.onClick2}>更新-无错误边界</Button>
			</Fragment>
		)
	}
}