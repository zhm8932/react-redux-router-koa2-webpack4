import numeral from 'numeral';
import ChartCard from './ChartCard'
import Field from './Field'
import MiniArea from './MiniArea'
import MiniBar from './MiniBar'
import MiniProgress from './MiniProgress'

const yuan = val => `￥${numeral(val).format('0,0')}`;
const Charts = {
	yuan,
	ChartCard
}

export {
	Charts as default,
	yuan,
	ChartCard,
	Field,
	MiniArea,
	MiniBar,
	MiniProgress
}