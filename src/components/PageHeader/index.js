import React, {PureComponent} from 'react';

import {Breadcrumb,Tabs,Skeleton} from 'antd';
import classNames from 'classnames';

const {TabPane} = Tabs;
import './index.scss'

export default class PageHeader extends PureComponent{
	state = {
		breadcrumb:null,
	};
	componentDidMount(){

	}
	componentDidUpdate(preProps){

	}
	render(){
		const {
			title,
			logo,
			action,
			content,
			extraContent,
			tabList,
			className,
			tabActiveKey,
			tabDefaultActiveKey,
			tabBarExtraContent,
			loading = false,
			wide = false
		} = this.props;
		const {breadcrumb} = this.state;
		const clsString = classNames('pageHeader',className);
		const activeKeyProps = {};
		if(tabDefaultActiveKey!==undefined){
			activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
		}
		if(tabActiveKey!==undefined){
			activeKeyProps.activeKey = tabActiveKey;
		}
		return (
			<div className={clsString}>
				<div className={wide?'wide':''}>
					<Skeleton
						loading={loading}
						title={false}
						active
						paragraph={{rows:3}}
						avatar={{size:'large'}}
					>
						{/*{breadcrumb}*/}
						<div className='detail'>
							{logo&&<div className='logo'>{logo}</div>}
							<div className="row">
								{title&&<h1 className='title'>{title}</h1>}
								{action&&<div className='action'>{action}</div>}
							</div>
							<div className="row">
								{content&&<div className='content'>{content}</div>}
								{extraContent&&<div className='extraContent'>{extraContent}</div>}
							</div>
						</div>
					</Skeleton>
				</div>
			</div>
		)
	}
}