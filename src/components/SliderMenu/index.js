import SiderMenu from './SiderMenu';
import classNames from 'classnames';
/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
const getFlatMenuKeys = menuData => {
	let keys = [];
	menuData.forEach(item => {
		if (item.children) {
			keys = keys.concat(getFlatMenuKeys(item.children));
		}
		keys.push(item.path);
	});
	return keys;
};

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
			flatMenuKeys={getFlatMenuKeys(menuData)}
			{...props}
		/>
	)
}

export default SliderMenuWrapper