const router = require('koa-router')()

const moment = require('moment')

router.prefix('/charts')


var visitData = [];
var beginDay = new Date().getTime();
var fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];

for (var i = 0; i < fakeY.length; i += 1) {
	visitData.push({
		x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
		y: fakeY[i]
	});
}

var visitData2 = [];
var fakeY2 = [1, 6, 4, 8, 3, 7, 2];

for (var _i = 0; _i < fakeY2.length; _i += 1) {
	visitData2.push({
		x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * _i)).format('YYYY-MM-DD'),
		y: fakeY2[_i]
	});
}

var salesData = [];

for (var _i2 = 0; _i2 < 12; _i2 += 1) {
	salesData.push({
		x: "".concat(_i2 + 1, "\u6708"),
		y: Math.floor(Math.random() * 1000) + 200
	});
}

var searchData = [];

for (var _i3 = 0; _i3 < 50; _i3 += 1) {
	searchData.push({
		index: _i3 + 1,
		keyword: "\u641C\u7D22\u5173\u952E\u8BCD-".concat(_i3),
		count: Math.floor(Math.random() * 1000),
		range: Math.floor(Math.random() * 100),
		status: Math.floor(Math.random() * 10 % 2)
	});
}

const salesTypeData = [
	{
		x: '家用电器',
		y: 4544,
	},
	{
		x: '食用酒水',
		y: 3321,
	},
	{
		x: '个护健康',
		y: 3113,
	},
	{
		x: '服饰箱包',
		y: 2341,
	},
	{
		x: '母婴产品',
		y: 1231,
	},
	{
		x: '其他',
		y: 1231,
	},
];
const salesTypeDataOnline = [
	{
		x: '家用电器',
		y: 244,
	},
	{
		x: '食用酒水',
		y: 321,
	},
	{
		x: '个护健康',
		y: 311,
	},
	{
		x: '服饰箱包',
		y: 41,
	},
	{
		x: '母婴产品',
		y: 121,
	},
	{
		x: '其他',
		y: 111,
	},
];
const salesTypeDataOffline = [
	{
		x: '家用电器',
		y: 99,
	},
	{
		x: '食用酒水',
		y: 188,
	},
	{
		x: '个护健康',
		y: 344,
	},
	{
		x: '服饰箱包',
		y: 255,
	},
	{
		x: '其他',
		y: 65,
	},
];
var offlineData = [];

for (var _i4 = 0; _i4 < 10; _i4 += 1) {
	offlineData.push({
		name: "Stores ".concat(_i4),
		cvr: Math.ceil(Math.random() * 9) / 10
	});
}

var offlineChartData = [];

for (var _i5 = 0; _i5 < 20; _i5 += 1) {
	offlineChartData.push({
		x: new Date().getTime() + 1000 * 60 * 30 * _i5,
		y1: Math.floor(Math.random() * 100) + 10,
		y2: Math.floor(Math.random() * 100) + 10
	});
}
var radarOriginData = [{
	name: '个人',
	ref: 10,
	koubei: 8,
	output: 4,
	contribute: 5,
	hot: 7
}, {
	name: '团队',
	ref: 3,
	koubei: 9,
	output: 6,
	contribute: 3,
	hot: 1
}, {
	name: '部门',
	ref: 4,
	koubei: 1,
	output: 6,
	contribute: 5,
	hot: 7
}]; //

var radarData = [];
var radarTitleMap = {
	ref: '引用',
	koubei: '口碑',
	output: '产量',
	contribute: '贡献',
	hot: '热度'
};
radarOriginData.forEach(function (item) {
	Object.keys(item).forEach(function (key) {
		if (key !== 'name') {
			radarData.push({
				name: item.name,
				label: radarTitleMap[key],
				value: item[key]
			});
		}
	});
});
let getFakeChartData = {
	visitData:visitData,
	visitData2: visitData2,
	salesData: salesData,
	searchData: searchData,
	offlineData: offlineData,
	offlineChartData: offlineChartData,
	salesTypeData: salesTypeData,
	salesTypeDataOnline: salesTypeDataOnline,
	salesTypeDataOffline: salesTypeDataOffline,
	radarData: radarData
}

router.get('/fakeData', function (ctx, next) {
	ctx.body = getFakeChartData
})


module.exports = router
