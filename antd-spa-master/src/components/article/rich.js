import React from 'react';
import Static from '../static/Static';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
export default class Rich extends React.Component {

	constructor(props) {
		super(props);
		this.state={
			Id:localStorage.getItem("richId"),
			IP:Static.IP+"/ueditor/richtext.jsp?Id="+localStorage.getItem("richId"),
		}
	}

	render() {
		return (
			<div>
			    <BreadcrumbCustom paths={['首页','富文本编辑','']}/>
				<div className="iframew">	
					<iframe className="iframe" title="rich"  src={this.state.IP}  />
				</div>
			</div>
		);
	}
}
