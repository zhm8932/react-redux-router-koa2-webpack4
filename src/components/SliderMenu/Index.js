import SiderMenu from './SiderMenu';


const SliderMenuWrapper = props =>{
	const { menuData,collapsed } = props;
	return (
		<SiderMenu
			{...props}
		/>
	)
}

export default SliderMenuWrapper