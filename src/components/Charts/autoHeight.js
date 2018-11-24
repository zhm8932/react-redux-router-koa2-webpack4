import React from 'react'

// 获取DIV高度
function computeHeight(node) {
	const totalHeight = parseInt(getComputedStyle(node).height,10);
	const padding =
		parseInt(getComputedStyle(node).paddingTop,10)+
		parseInt(getComputedStyle(node).paddingBottom,10)
	return totalHeight - padding
}
const getAutoHeight = (n)=>{
	if(!n){
		return 0;
	}
	let node = n;
	let height = computeHeight(node);
	while (!height){
		node = node.parentNode;
		if(node){
			height = computeHeight(node)
		}else{
			break;
		}
	}
	return height
}

const autoHeight = ()=>WrappedComponent =>
	class extends React.Component {
		state = {
			computedHeight : 0
		}
		componentDidMount(){
			const {height}= this.props;
			if(!height){
				const h = getAutoHeight(this.root)
				this.setState({computedHeight:h})
			}
		}
		handleRoot = node=>{
			this.root = node
		}
		render(){
			const {height} = this.props;
			const {computedHeight} = this.state;
			const h = height||computedHeight
			console.log("h:::",h)
			return (
				<div ref={this.handleRoot}>
					{h>0&&<WrappedComponent {...this.props} height={h}/>}
				</div>
			)
		}
	}


export default autoHeight