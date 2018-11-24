import React from 'react';
import './index.scss'

const Field = ({label, value, ...rest})=>(
	<div className='field' {...rest}>
		<label className='label'>{label}</label>
		<span className='value'>{value}</span>
	</div>
)

export default Field