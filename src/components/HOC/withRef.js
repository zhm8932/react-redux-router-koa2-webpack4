
export default function withRef(WrappedComponent) {
	return class extends React.Component {
		constructor(props){
			super(props)
			this.someMethod()
		}
		someMethod(){
			this.wrappedInstance.someMethodInWrappedComponent()
		}
		render(){
			// 为被包装组件添加ref属性，从而获取该组件实例并赋值给this.wrappedInstance
			return <WrappedComponent ref={instance => {this.wrappedInstance = instance}} {...this.props}/>
		}
	}
}