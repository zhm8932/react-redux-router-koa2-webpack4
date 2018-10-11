
import { LocaleProvider } from 'antd';

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';

export default (props) =>{
	return (
		<LocaleProvider locale={zhCN}>{props.children}</LocaleProvider>
	)
}
