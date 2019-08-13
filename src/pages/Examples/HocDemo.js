import {Fragment} from 'react'
import WithPersisterData from '../../components/HOC/WithPersisterData'

@WithPersisterData
export default class HocDemo extends React.Component{
	componentDidMount(){
		let data = {
			userId:12,
			role:'A'
		}
		localStorage.setItem('data',JSON.stringify(data))
	}
	render(){
		console.log('props----:',this.props)
		return (
			<Fragment>
				<h2>高阶组件</h2>
				<div>{this.props.data}</div>
			</Fragment>
		)
	}
}