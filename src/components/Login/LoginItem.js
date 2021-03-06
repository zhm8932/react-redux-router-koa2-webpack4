import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import omit from 'omit.js';
import styles from './index.scss';
import ItemMap from './map';
import LoginContext from './loginContext';

const FormItem = Form.Item;

class WrapFormItem extends Component {
	static defaultProps = {
		buttonText: '获取验证码',
	};
	constructor(props) {
		super(props);
		this.state = {
			count: 0,
		};
	}

	componentDidMount() {
		const { updateActive, name } = this.props;
		console.log("namename:",name)
		console.log("this.props:",this.props)
		if (updateActive) {
			updateActive(name);
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	onGetCaptcha = () => {
		const { onGetCaptcha } = this.props;
		const result = onGetCaptcha ? onGetCaptcha() : null;
		console.log("result:",result)
		if (result === false) {
			return;
		}
		if (result instanceof Promise) {
			result.then(this.runGetCaptchaCountDown);
		} else {
			this.runGetCaptchaCountDown();
		}
	};

	getFormItemOptions = ({ onChange, defaultValue, customprops, rules }) => {
		const options = {
			rules: rules || customprops.rules,
		};
		if (onChange) {
			options.onChange = onChange;
		}
		if (defaultValue) {
			options.initialValue = defaultValue;
		}
		return options;
	};

	runGetCaptchaCountDown = () => {
		console.log("runGetCaptchaCountDownrunGetCaptchaCountDown")
		const { countDown } = this.props;
		let count = countDown || 59;
		console.log("count:",count)
		this.setState({ count });
		this.interval = setInterval(() => {
			count -= 1;
			this.setState({ count });
			if (count === 0) {
				clearInterval(this.interval);
			}
		}, 1000);
	};

	render() {
		const { count } = this.state;

		const {
			form: { getFieldDecorator },
		} = this.props;

		// 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props
		const {
			onChange,
			customprops,
			defaultValue,
			rules,
			name,
			buttonText,
			updateActive,
			type,
			...restProps
		} = this.props;

		// get getFieldDecorator props
		const options = this.getFormItemOptions(this.props);

		const otherProps = restProps || {};
		if (type === 'Captcha') {
			const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);
			return (
				<FormItem>
					<Row gutter={8}>
						<Col span={16}>
							{getFieldDecorator(name, options)(<Input {...customprops} {...inputProps} />)}
						</Col>
						<Col span={8}>
							<Button
								disabled={count}
								className={styles.getCaptcha}
								size="large"
								onClick={this.onGetCaptcha}
							>
								{count ? `${count} s` : buttonText}
							</Button>
						</Col>
					</Row>
				</FormItem>
			);
		}
		console.log("name:",name,"options:",options)
		console.log("customprops:",customprops,"otherProps:",otherProps)
		return (
			<FormItem>
				{getFieldDecorator(name, options)(<Input {...customprops} {...otherProps} />)}
			</FormItem>
		);
	}
}

const LoginItem = {};
Object.keys(ItemMap).forEach(key => {
	const item = ItemMap[key];
	LoginItem[key] = props => {
		console.log("props：",props)
		return (
			<LoginContext.Consumer>
				{context => {
					console.log("context:",context)
					return (
						<WrapFormItem
							customprops={item.props}
							{...props}
							rules={item.rules}
							type={key}
							updateActive={context.updateActive}
							form={context.form}
						/>
					)
				}}
			</LoginContext.Consumer>
		)
	};
});

console.log("LoginItem:",LoginItem)

export default LoginItem;
