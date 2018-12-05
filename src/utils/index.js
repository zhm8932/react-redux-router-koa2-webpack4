import * as tools from '../../server/utils/tools';

console.log("tools:",tools)

export const digitUppercase = tools.digitUppercase;
export const formatDate = tools.formatDate;
export const htmlEncode = tools.htmlEncode;
export const distance = tools.distance;
export const toBoolean = tools.toBoolean;

// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
// eslint-disable-next-line import/prefer-default-export
export const urlToList = function (url) {
	const urllist = url.split('/').filter(i => i);
	return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
}

export function fixedZero(val) {
	return val * 1 <10 ? `0${val}`:val;
}
export function getTimeDistance(type) {
	const now = new Date();
	const oneDay = 24 * 60 * 60 * 1000;

	if(type === 'today'){
		now.setHours(0);
		now.setMinutes(0);
		now.setSeconds(0);
		return [moment(now),moment(now.getTime() + (oneDay - 1000))]
	}
	if(type ==='preWeek'){
		let preDate = moment(now).subtract(1,'weeks')
		const startTime = preDate.format('YYYY-MM-DD');
		return [
			moment(`${startTime} 00:00:00`),
			moment(moment(startTime).valueOf() + (7*oneDay - 1000))
		]
	}
	if(type === 'week'){
		let day = now.getDay();  //星期 0~6
		now.setHours(0);
		now.setMinutes(0);
		now.setSeconds(0);

		//周一计算起
		if(day === 0){
			day = 6
		}else{
			day -=1
		}
		const startTime = now.getTime() - day * oneDay //已过去的时间
		return [moment(startTime),moment(startTime+ (7*oneDay - 1000))]
	}
	if(type ==='nextWeek'){
		let preDate = moment(now).add(1,'weeks')
		const startTime = preDate.format('YYYY-MM-DD');
		return [
			moment(`${startTime} 00:00:00`),
			moment(moment(startTime).valueOf() + (7*oneDay - 1000))
		]
	}
	if(type ==='month'){
		const year = now.getFullYear();
		const month = now.getMonth();
		const nextDate = moment(now).add(1,'months');  //1个月之后的时间
		const nextYear = nextDate.year();
		const nextMonth = nextDate.month();
		console.log("nextDate:",nextDate.format('YYYY-MM-DD hh:mm:ss'),"nextYear:",nextYear,"nextMonth:",nextMonth)

		return [
			moment(`${year}-${fixedZero(month+1)}-01 00:00:00`),
			moment(moment(`${nextYear}-${fixedZero(nextMonth +1 )}-01 00:00:00`).valueOf()-1000),  //下个月的1号0点减1s, valueOf()当前时间的时间戳
			// moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),  //
		]
	}
	const year = now.getFullYear();
	return [moment(`${year}-01-01 00:00:00`),moment(`${year}-12-31 23:59:59`)]
}




















