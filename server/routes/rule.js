const router = require('koa-router')()

router.prefix('/rule');

const qs = require('querystring');
const parse = qs.parse;

// mock tableListDataSource
const owners = ['曲丽丽','库珊珊','李冰冰','曾芸芸','乐晓晓','唐晓三','王钰钰','笑三笑','古天乐','夏雨']
const types = ['订购关系生效','财务复审','部门初审','提交订单','创建订单','修改订单','确认订单','支付','删除订单','确认合同']
let tableListDataSource = [];
for (let i = 1; i < 46; i += 1) {
	tableListDataSource.push({
		key: i,
		disabled: i % 6 === 0,
		href: 'https://ant.design',
		avatar: [
			'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
			'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
		][i % 2],
		name: `TradeCode ${i}`,
		title: `一个任务名称 ${i}`,
		owner: owners[(Math.floor(Math.random() * 10)%10)],
		type: types[(Math.floor(Math.random() * 10)%10)],
		desc: '这是一段描述',
		callNo: Math.floor(Math.random() * 9000000),
		status: Math.floor(Math.random() * 10) % 6,
		price: Math.floor(Math.random() * 500).toFixed(2),
		num: Math.floor(Math.random() * 100),
		barcode: Math.floor(Math.random() * 6000000000000000),
		updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
		createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
		progress: Math.ceil(Math.random() * 100),
	});
}


function getRule(ctx) {

	const params = ctx.request.query;

	console.log("params:",params)
	let dataSource = tableListDataSource;

	if (params.sorter) {
		const s = params.sorter.split('_');
		dataSource = dataSource.sort((prev, next) => {
			if (s[1] === 'descend') {
				return next[s[0]] - prev[s[0]];
			}
			return prev[s[0]] - next[s[0]];
		});
	}
	if (params.price){
		const price = params.price.split('_');
		console.log("price:",price)
		dataSource = dataSource.sort((prev,next)=>{
			if (price[1] === 'descend') {
				return next[price[0]] - prev[price[0]];
			}
			return prev[price[0]] - next[price[0]];
		})
	}
	if (params.num){
		const arr = params.num.split('_');
		console.log("arr:",arr)
		dataSource = dataSource.sort((prev,next)=>{
			if (arr[1] === 'descend') {
				return next[arr[0]] - prev[arr[0]];
			}
			return prev[arr[0]] - next[arr[0]];
		})
	}

	if (params.status) {
		const status = params.status.split(',');
		let filterDataSource = [];
		status.forEach(s => {
			filterDataSource = filterDataSource.concat(
				dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
			);
		});
		dataSource = filterDataSource;
	}

	if (params.name) {
		dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
	}

	if (params.title) {
		dataSource = dataSource.filter(data => data.title.indexOf(params.title) > -1);
	}

	let pageSize = 10;
	if (params.pageSize) {
		pageSize = params.pageSize * 1;
	}

	let current = parseInt(params.currentPage, 10) || 1;
	let curDataSource = params.isPaging
		?dataSource.slice(current*pageSize,current*pageSize+pageSize)
		:dataSource;
	// let curDataSource = dataSource.slice((current-1)*pageSize,current*pageSize+1); //当前页数据
	const result = {
		list: curDataSource,
		pagination: {
			total: dataSource.length,
			pageSize,
			current
		},
	};

	return result
}

router.get('/list',function (ctx,next) {
	let data = getRule(ctx);
	console.log("request:",JSON.stringify(ctx.request))
	console.log("data:",JSON.stringify(data))
	ctx.body = data;
})


function postRule(ctx) {

	const body = ctx.request.body;
	let {method} = ctx;
	console.log("postRule---body:",body)
	const {name, desc, key,createdAt,owner,title} = body;

	method = method.toLocaleLowerCase();
	switch (method) {
		/* eslint no-case-declarations:0 */
		case 'delete':
			tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
			break;
		case 'post':
			const i = Math.ceil(Math.random() * 10000);
			tableListDataSource.unshift({
				key: i,
				href: 'https://ant.design',
				avatar: [
					'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
					'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
				][i % 2],
				name: `TradeCode ${i}`,
				title: `一个任务名称 ${i}`,
				owner: owner||'曲丽丽',
				desc,
				callNo: Math.floor(Math.random() * 1000),
				status: Math.floor(Math.random() * 10) % 2,
				updatedAt: new Date(),
				createdAt: new Date(),
				progress: Math.ceil(Math.random() * 100),
			});
			break;
		case 'put':   //更新
			tableListDataSource = tableListDataSource.map(item => {
				if (item.key === key) {
					Object.assign(item, { desc, name,title,owner,createdAt});
					return item;
				}
				return item;
			});
			break;
		default:
			break;
	}

	const result = {
		list: tableListDataSource,
		pagination: {
			total: tableListDataSource.length,
		},
	};

	return result
}

router.all('/handleRule',function (ctx,next) {
	const data = postRule(ctx);
	console.log("handleRule-data:",JSON.stringify(data))
	ctx.body = data
})


module.exports = router;