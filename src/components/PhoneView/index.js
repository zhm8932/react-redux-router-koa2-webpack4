import React,{Fragment,PureComponent} from 'react';
import {Input} from 'antd';
import './index.scss';

export default class PhoneView extends PureComponent{
	constructor(props){
		super(props)
	}
	render(){
		const {value,onChange} = this.props;
		let values = ['',''];
		if(value){
			values = value.split('-');
		}
		return (
			<Fragment>
				<Input className='area_code'
					   defaultValue={values[0]}
					   onChange={e=>onChange(`${e.target.value}-${values[1]}`)}
				/>
				<Input className='phone_number'
					   defaultValue={values[1]}
					   onChange={e=>onChange(`${values[0]}-${e.target.value}`)}
				/>

			</Fragment>
		)
	}
}