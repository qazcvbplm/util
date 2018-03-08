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

	};
	componentDidMount(){
          let show=<iframe onLoad={this.iload.bind(this)} className="iframe" title="rich"  src={this.state.IP}  />;
          this.setState({show:show})
	};
    iload(){
    	console.log()
    	/*let frame=this.state.show;
      frame.height=frame.contentWindow.document.documentElement.scrollHeight;
	  frame.width=frame.contentWindow.document.documentElement.scrollWidth;*/
    };
	render() {
		return (
			<div>
			    <BreadcrumbCustom paths={['首页','富文本编辑','']}/>
				<div className="iframew"   >	
					{this.state.show}
				</div>
			</div>
		);
	}
}
