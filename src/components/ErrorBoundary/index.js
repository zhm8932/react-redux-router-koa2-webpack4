import {Fragment} from 'react'
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error:null,
			errorInfo:null
		};
	}

	componentDidCatch(error, info) {
		// 显示错误UI
		this.setState({
			hasError: true,
			error:error,
			errorInfo:info
		});
		// 同时输出错误日志
		console.log(error, 'info:',info);
		// console.log(error, 'info:',info);
	}

	render() {
		if (this.state.hasError) {
			return (
				<Fragment>
					<h1>{this.state.error && this.state.error.toString()}</h1>
					<p>{this.state.errorInfo.componentStack}</p>
				</Fragment>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary