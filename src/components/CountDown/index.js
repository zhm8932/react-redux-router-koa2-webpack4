import {fixedZero} from '../../utils'
const initTime = props =>{
	let lastTime = 0;
	let targetTime = 0;
	try {
		if(Object.prototype.toString.call(props.target) === '[object Date]'){
			targetTime = props.target.getTime()
		} else {
			targetTime = new Date(props.target).getTime()
		}
	}catch (e) {
		throw new Error('invalid target props',e);
	}
	//剩余时间
	lastTime = targetTime - new Date().getTime()
	return {
		lastTime : lastTime<0?0:lastTime
	}
}

class CountDown extends React.Component{
	interval = 1000;
	constructor(props){
		super(props)
		const {lastTime} = initTime(props);
		this.state={
			lastTime
		}
	}
	//使组件能够根据changes in props的结果更新其内部状态
	/*
	* 组件实例化后和接受新属性时将会调用getDerivedStateFromProps。
	* 它应该返回一个对象来更新状态，或者返回null来表明新属性不需要更新任何状态。

	注意，如果父组件导致了组件的重新渲染，即使属性没有更新，这一方法也会被调用。
	如果你只想处理变化，你可能想去比较新旧值
	* */
	static getDerivedStateFromProps(nextProps,preState){
		const {lastTime} = initTime(nextProps)
		console.log("nextProps:",nextProps,"preState:",preState,"lastTime:",lastTime)
		if(preState.lastTime!==lastTime){
			return {lastTime}
		}
		return null

	}
	componentDidMount(){
		this.tick();
	}
	componentDidUpdate(prevProps){
		const {target} = this.props;
		console.log("target:",target,"prevProps:",prevProps)
		if(target!==prevProps.target){
			console.log("重新倒计时")
			clearTimeout(this.timer)
			this.tick()
		}
	}
	componentWillUnmount(){
		clearTimeout(this.timer)
	}
	defaultFormat = time=>{
		const hours = 60 * 60 *1000;
		const minutes = 60 * 1000
		const h = Math.floor(time / hours);
		const m = Math.floor((time - h*hours)/minutes);
		const s = Math.floor((time - h*hours - m*minutes)/1000);
		console.log("h：",h,"m:",m,"s:",s)
		return (
			<span>{fixedZero(h)}:{fixedZero(m)}:{fixedZero(s)}</span>
		)
	}
	tick=()=>{
		const {onEnd} = this.props;
		let {lastTime} = this.state;
		this.timer = setTimeout(()=>{
			if(lastTime<this.interval){
				clearTimeout(this.timer)
				this.setState({
					lastTime
				}, ()=>{
					onEnd&&onEnd()
				})
			}else{
				lastTime -=this.interval;
				this.setState({
					lastTime
				},()=>{
					this.tick()
				})
			}
		},this.interval)
	}
	render(){
		const {format = this.defaultFormat,onEnd,...rest} = this.props;
		const {lastTime} = this.state;
		const result = format(lastTime)
		console.log("this.state:",this.state)
		return <span {...rest}>{result}</span>
	}
}

export default CountDown