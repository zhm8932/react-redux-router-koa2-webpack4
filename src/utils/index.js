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
