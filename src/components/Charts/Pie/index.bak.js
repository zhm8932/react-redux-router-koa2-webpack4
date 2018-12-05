import {Chart,Tooltip,Geom,Coord} from 'bizcharts';
import { DataView } from '@antv/data-set';
import {Divider} from 'antd';
import classNames from 'classnames';
import autoHeight from '../autoHeight';

import './index.scss';
@autoHeight()

export default class Pie extends React.Component{
	state = {
		legendData:[],
		legendBlock:false
	}
	componentDidMount(){

	}
	componentDidUpdate(preProps){
		const { data } = this.props;
		if (data !== preProps.data) {
			// because of charts data create when rendered
			// so there is a trick for get rendered time
			this.getLegendData();
		}
	}
	componentWillUnmount(){

	}
	getG2Instance = chart=>{
		this.chart = chart;
		//方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。
		//requestAnimationFrame的用法与settimeout很相似，只是不需要设置时间间隔而已
		console.log("requestAnimationFrame:",requestAnimationFrame)
		requestAnimationFrame(()=>{
			this.getLegendData()
		})
	}
	getLegendData=()=>{
		console.log("this.chart:",this.chart)
		if(!this.chart) return;
		const geom = this.chart.getAllGeoms()[0];  //获取所有的图形
		// console.log("geom::::",geom)
		if(!geom) return;
		const items = geom.get('dataArray')||[];
		console.log("itemsitemsitems:",items)
		const legendData = items.map(item=>{
			const origin = item[0]._origin;
			origin.color = item[0].color;
			origin.checked = true;
			return origin
		})
		console.log("legendDatalegendData:",legendData)
		this.setState({
			legendData,
		});
	}
	handleLegendClick=(item,i)=>{
		const newItem = item;
		newItem.checked = !newItem.checked;  //改变是否选中状态
		const {legendData} = this.state;
		legendData[i] = newItem;
		console.log("legendData:",legendData,"newItem:",newItem)
		const filteredLegendData = legendData.filter(item=>item.checked).map(l => l.x)
		console.log("filteredLegendData:",filteredLegendData,"this.chart:",this.chart.filter)
		if(this.chart){
			this.chart.filter('x',val=>{
				console.log("chartval:::::::",val,filteredLegendData.indexOf(val) > -1)
				return filteredLegendData.includes(val)
				// return filteredLegendData.indexOf(val) > -1
			})
		}
		this.setState({
			legendData
		});
	}
	render(){
		const {
			valueFormat,
			subTitle,
			total,
			hasLegend = false,
			className,
			style,
			height,
			forceFit = true,
			percent = 0,
			color,
			inner = 0.75,
			animate = true,
			colors,
			lineWidth = 1
		} = this.props
		const {legendData,legendBlock} = this.state;
		const pieClassName = classNames('pie',className,{
			hasLegend:!!hasLegend,
			legendBlock:legendBlock
		})
		const {
			data: propsData,
			selected: propsSelected = true,
			tooltip: propsTooltip = true,
		} = this.props;

		let data = propsData || [];
		let selected = propsSelected;
		let tooltip = propsTooltip;

		const defaultColors = colors;
		data = data || [];
		selected = selected || true;
		tooltip = tooltip || true;
		let formatColor;

		const scale = {
			x: {
				type: 'cat',
				range: [0, 1],
			},
			y: {
				min: 0,
			},
		};

		if (percent) {
			selected = false;
			tooltip = false;
			formatColor = value => {
				if (value === '占比') {
					return color || 'rgba(24, 144, 255, 0.85)';
				}
				return '#F0F2F5';
			};

			data = [
				{
					x: '占比',
					y: parseFloat(percent),
				},
				{
					x: '反比',
					y: 100 - parseFloat(percent),
				},
			];
		}

		const tooltipFormat = [
			'x*percent',
			(x, p) => ({
				name: x,
				value: `${(p * 100).toFixed(2)}%`,
			}),
		];

		const padding = [12, 0, 12, 0];

		const dv = new DataView();
		dv.source(data).transform({
			type: 'percent',
			field: 'y',
			dimension: 'x',
			as: 'percent',
		});

		console.log("legendData:",legendData)
		return (
			<div className={pieClassName} style={style}>
				<div className="chart">
					<Chart
						scale={scale}
						height={height}
						forceFit={forceFit}
						data={dv}
						padding={padding}
						animate={animate}
						onGetG2Instance={this.getG2Instance}
					>
						{!!tooltip && <Tooltip showTitle={false} />}
						<Coord type="theta" innerRadius={inner} />
						<Geom
							style={{ lineWidth, stroke: '#fff' }}
							tooltip={tooltip && tooltipFormat}
							type="intervalStack"
							position="percent"
							color={['x', percent ? formatColor : defaultColors]}
							selected={selected}
						/>
					</Chart>
					{(subTitle || total) && (
						<div className="total">
							{subTitle && <h4 className="pie-sub-title">{subTitle}</h4>}
							{/* eslint-disable-next-line */}
							{total && (
								<div className="pie-stat">{typeof total === 'function' ? total() : total}</div>
							)}
						</div>
					)}
				</div>
				{ hasLegend &&(
					<ul className="legend">
						{legendData.map((item,i)=>(
							<li key={item.x} onClick={()=>this.handleLegendClick(item,i)}>
								<span className='dot' style={{backgroundColor:item.checked?item.color:'#aaa'}}></span>
								<span className="legendTitle">{item.x}</span>
								<Divider type='vertical'/>
								<span className='percent'>
									{`${(Number.isNaN(item.percent) ? 0 : item.percent * 100).toFixed(2)}%`}
								</span>
								<span className="value">{valueFormat ? valueFormat(item.y) : item.y}</span>
							</li>
						))}
					</ul>
				)}
			</div>
		)
	}
}