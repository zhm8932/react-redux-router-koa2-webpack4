import numeral from 'numeral';
import ChartCard from './ChartCard'

const yuan = val => `￥${numeral(val).format('0,0')}`;
const Charts = {
	yuan,
	ChartCard
}

export {
	Charts as default,
	yuan,
	ChartCard
}