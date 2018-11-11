import React ,{Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Menu} from 'antd';
import './index.scss';

export default class Info extends Component{
	constructor(props){
		super(props)
		const {match,location} = props;
		console.log("propsprops:",props)
		const menuMap = {
			base:<FormattedMessage id='menu.account.settings.base' defaultMessage="Basic Settings"/>,
			security:<FormattedMessage id='menu.account.settings.security' defaultMessage="security Setting"/>,
			binding:<FormattedMessage id='menu.account.settings.binding' defaultMessage="Account binding"/>,
			notification:<FormattedMessage id='menu.account.settings.notification' defaultMessage="Basic notification"/>,
		}
		const key = location.pathname.replace(`${match.path}/`,'');
		console.log("key:::::::",key)
		this.state = {
			mode:'inline',    //vertical horizontal inline
			menuMap,
			selectKey : menuMap[key]?key:'base'
		}
	}
	changeMenuMode=(mode)=>{
		this.setState({
			mode
		})
	}
	getMenu = ()=>{
		const {menuMap} = this.state;
		console.log("menuMap:::",menuMap)
		return Object.keys(menuMap).map(item=> <Menu.Item key={item}>{menuMap[item]}</Menu.Item>)
	}
	selectKey=({key})=>{
		const {history} = this.props;
		history.push(`/account/settings/${key}`)
		this.setState({
			selectKey:key
		})
	}
	getRightTitle(){
		const {selectKey,menuMap} = this.state;
		return menuMap[selectKey]
	}
	render(){
		console.log("this.props:::",this.props)
		const {children} = this.props;
		const {mode,selectKey} = this.state;
		return (
			<div className='setting-main'>
				<div className='left-menu'>
					<Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
						{this.getMenu()}
					</Menu>
				</div>
				<div className='info-right' changeMenuMode={this.changeMenuMode}>
					<h4 className='title'>{this.getRightTitle()}</h4>
					{children}
					{/*{React.Children.map(children,child=>{
						console.log("children:",children)
						// return <div className='333333333'>{child}</div>
						return React.cloneElement(child, {
							//把父组件的props.name赋值给每个子组件
							// changeMenuMode: this.changeMenuMode,
							name:'123456',
							baseInfo: "defdefdef"
						})
					})}*/}
				</div>
			</div>
		)
	}
}
