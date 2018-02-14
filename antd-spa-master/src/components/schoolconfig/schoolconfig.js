import React from 'react';
import {Form,Input,Row,Button,message} from 'antd';
import Static from '../static/Static';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
const FormItem = Form.Item;
class Schoolconfig extends React.Component {

	constructor(props) {
		super(props);
		this.state={

		};
	};
    submit(){
        let fields=this.props.form.getFieldsValue();
        fields.sunwouId=Static.school.sunwouId;
        Static.Loading();
        	Static.request("/school/update",fields,function(res){
                if(res.code){
                      message.success('更新成功');
                      Static.school=res.params.school;
                }else{
                	message.error('更新失败请重试');
                }
                Static.hideLoading();
        	});
      
    };
	render() {
		const { getFieldDecorator} = this.props.form;
		 const formItemLayout  = {
		      labelCol: { span: 8},
		      wrapperCol: { span: 8},
		    };
		return (
			<div>
			<BreadcrumbCustom paths={['首页','学校配置','']}/>
			<div className="form">
			
			  <Form >
			     <Row align="middle">
	                   <FormItem label="用户名"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('schoolUserName',{initialValue:Static.school.schoolUserName})(<Input disabled={true} />)}
				        </FormItem>
			     </Row> 
			     <Row align="middle">
	                   <FormItem label="密码"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('schoolPassWord',{initialValue:Static.school.schoolPassWord})(<Input type="password" />)}
				        </FormItem>
			     </Row> 
			     <Row align="middle">
	                   <FormItem label="首页标题栏"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('indexTopTitle',{initialValue:Static.school.indexTopTitle})(<Input   />)}
				        </FormItem>
			     </Row>
			      <Row align="middle">
	                   <FormItem label="倒数天数"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('indexTopDay',{initialValue:Static.school.indexTopDay})(<Input  type="number" />)}
				        </FormItem>
			     </Row>
			     <Row align="middle">
			          <Row>
			            <center><Button type="primary" onClick={this.submit.bind(this)}>确定</Button></center>
			          </Row>
			     </Row> 
              </Form>
			</div>
			</div>
		);
	}
}
Schoolconfig = Form.create()(Schoolconfig);

export default Schoolconfig;