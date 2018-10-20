import React,{PureComponent} from 'react';
import {Link} from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import MenuContext from '../../layouts/MenuContext';

import './index.scss'


class PageHeaderWrapper extends PureComponent {
	render(){
		const {children,contentWidth,wrapperClassName,top,...restProps} = this.props;
		// console.log("children:",children)
		// console.log("restProps:",restProps);
		return (
			<div style={{margin:'-10px -10px 0'}} className={wrapperClassName}>
				{top}
				<MenuContext.Consumer>
					{value =>(
						<PageHeader
							wide={contentWidth ==='Fixed'}
							{...value}
							myvalue={value}
							restProps={restProps}
							home="首页"
							key='pageheader'
							{...restProps}
							linkElement={Link}
							itemRender={item=>{
								return item.name
							}}
						/>
					)}
				</MenuContext.Consumer>
				{children ?(
					<div className='main'>{children}</div>
				):null
				}
			</div>
		)
	}
}

export default PageHeaderWrapper;














