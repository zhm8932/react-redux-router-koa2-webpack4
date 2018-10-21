import SiderMenu from './SiderMenu';
import classNames from 'classnames';


const SliderMenuWrapper = props =>{
	const { menuData,collapsed,fixSiderbar,theme } = props;
	console.log("menuData::::",menuData)
	const siderClassName = classNames('slide11111111',{
		fixSiderbar:fixSiderbar,
		light:theme==='light'
	})
	console.log("siderClassName::::",siderClassName)
	return (
		<SiderMenu
			theme={theme}
			className={siderClassName}
			{...props}
		/>
	)
}

export default SliderMenuWrapper