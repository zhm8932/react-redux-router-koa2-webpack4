import React,{Component} from 'react'

/*
* 高阶组件使用场景
* 一：操纵props
* 二：通过ref访问组件实例
* 三：组件状态提升
* 四：使用其他元素包装组件
* */

//操纵props  高阶组件可以先拦截props,对props执行增加、删除或修改的操作
function withPersisterData(WrappedComponent) {
	return class extends Component {
		componentWillMount(){
			let data = localStorage.getItem('data')
			this.setState({data})
		}
		render(){
			// 通过{...this.props}把传递给当前组件的属性继续传给被包装的组件
			return <WrappedComponent data={this.state.data} {...this.props}/>
		}
	}
}

export default withPersisterData