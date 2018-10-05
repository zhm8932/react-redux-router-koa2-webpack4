// import nzh from 'nzh/cn';
const nzh = require('nzh/cn');
//前后端公共方法
exports.formatDate = function(value, format) {
	if(!value){
		return ''
	}
	var t = new Date(value);
	var tf = function (i) {
		return (i < 10 ? '0' : '') + i
	};
	return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function (a) {
		switch ( a ) {
			case 'YYYY':
				return tf(t.getFullYear());
				break;
			case 'MM':
				return tf(t.getMonth() + 1);
				break;
			case 'DD':
				return tf(t.getDate());
				break;
			case 'hh':
				return tf(t.getHours());
				break;
			case 'mm':
				return tf(t.getMinutes());
				break;
			case 'ss':
				return tf(t.getSeconds());
				break;
			default:
				return new Error('请传入正确的符号');

		}
	});
}

//html字符转义过滤函数
exports.htmlEncode =  function (str) {
	if(typeof str ==="string"&&str!==""){
		return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
	}else{
		return str
	}
}

exports.distance = function(str) {
	if(!str||str==='undefined'){
		return ''
	}else{
		if(str>=1000){
			str = (str/1000).toFixed(2)+"km"
		}else{
			str = str+"m";
		}
		return str;
	}
}

//"true","false"转为布尔值
exports.toBoolean = function (str) {
	return (/^true$/i).test(str);
}
//数组转换为中文大写
exports.digitUppercase = function(n){
	return nzh.toMoney(n);
}



