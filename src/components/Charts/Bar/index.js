import React,{Component} from 'react';
import {Chart,Axis,Tooltip,Geom} from 'bizcharts';
import  autoHeight from '../autoHeight';

@autoHeight()
export default class Bar extends Component{
	componentDidMount(){

	}
	componentWillUnmount(){

	}
	render(){
		const {
			height,
			title,
			forceFit = true,
			data,
			color = 'rgba(24, 144, 255, 0.85)',
			padding,
		} = this.props;

		const scale = {
			x: {
				type: 'cat',
			},
			y: {
				min: 0,
			},
		};

		const tooltip=[
			'x*y',
			(x, y) => ({
				name: x,
				value: y,
			}),
		]
		return (
			<div className="chart" style={{height}}>
				{title&&<h4 className='mb-lg'>{title}</h4>}
				<Chart
					scale={scale}
					height={title?height - 42:height}
					forceFit={forceFit}
					data={data}
					padding={padding || 'auto'}
				>
					<Axis name='x' title={false}/>
					<Axis name="y" min={0} />
					<Tooltip showTitle={false} crosshairs={false}/>
					<Geom type='interval' position='x*y' color={color} tooltip={tooltip}/>
				</Chart>
			</div>
		)
	}
}