
import { LocaleProvider } from 'antd';
import {addLocaleData,IntlProvider,injectIntl} from 'react-intl';

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import defaultAntd from 'antd/lib/locale-provider/zh_CN';
import zhCN from '../locales/zh-CN';
import enUS from '../locales/en-US';


const localeInfo = {
	'en-US': {
		messages: require('../locales/en-US').default,
		locale: 'en-US',
		antd: require('antd/lib/locale-provider/en_US'),
		data: require('react-intl/locale-data/en'),
	},
	'zh-CN': {
		messages: require('../locales/zh-CN').default,
		locale: 'zh-CN',
		antd: require('antd/lib/locale-provider/zh_CN'),
		data: require('react-intl/locale-data/zh'),
	},
};

let appLocale = {
	locale: 'zh-CN',
	messages: {},
	data: require('react-intl/locale-data/zh')
};

appLocale = localeInfo['zh-CN'] || appLocale;
window.g_lang = appLocale.locale;
appLocale.data && addLocaleData(appLocale.data);
console.log("appLocale.messages:",appLocale.messages)


export default (props) =>{
	return (
		<LocaleProvider locale={appLocale.antd||defaultAntd}>
			<IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
				{props.children}
			</IntlProvider>
		</LocaleProvider>
	)
}
