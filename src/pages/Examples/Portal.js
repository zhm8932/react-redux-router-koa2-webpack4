import {PureComponent,Fragment} from 'react'
import {Button} from 'antd'
import './portal.scss'
class Modal extends PureComponent{
	constructor(props) {
		super(props);
		this.container = document.createElement("div");
		document.body.appendChild(this.container);
	}

	componentWillUnmount() {
		document.body.removeChild(this.container);
	}

	render() {
		return ReactDOM.createPortal(
			<div className="modal">
				<span className="close" onClick={this.props.onClose}>
				  &times;
				</span>
				<div className="content">{this.props.children}</div>
			</div>,
			this.container
		);
	}
}
export default class Portal extends PureComponent{
	constructor(props){
		super(props)
		this.state = {
			showModal:false
		}
	}
	onClick =()=> {
		this.setState({
			showModal: !this.state.showModal
		})
	}
	render(){
		return (
			<Fragment>
				<h2>Dashboard</h2>
				<Button onClick={this.onClick}>显示弹框</Button>
				{this.state.showModal&&(
					<Modal onClose={this.onClick}>
						Modal Dialog
					</Modal>
				)}
			</Fragment>
		)
	}
}