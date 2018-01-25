import React from 'react';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import {Form,Input,Row,Button,message} from 'antd';
import Static from '../static/Static';

const FormItem = Form.Item;
class Flooradd extends React.Component {

	constructor(props) {
		super(props);
		this.state={

		};
	};
    submit(){
        let fields=this.props.form.getFieldsValue();
        if(fields.name){
        	Static.request("/floor/add",{
                 name:fields.name,
                 schoolId:Static.school.sunwouId
        	},function(res){
                if(res.code){
                      message.success('添加成功')
                }else{
                	message.error('添加失败请重试')
                }
        	});
        }else{
			message.error('请输入名字');
        }
    };
	render() {
		const { getFieldDecorator} = this.props.form;
		 const formItemLayout  = {
		      labelCol: { span: 8},
		      wrapperCol: { span: 8},
		    };
		return (
			<div >
			  <BreadcrumbCustom paths={['首页','店铺管理','添加楼栋']}/>
			  <Form className="form">
			     <Row align="middle">
	                   <FormItem label="楼栋名字"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('name')(<Input placeholder="楼栋名字" />)}
				        </FormItem>
			     </Row> 
			     <Row align="middle">
			          <Row>
			            <center><Button type="primary" onClick={this.submit.bind(this)}>添加</Button></center>
			          </Row>
			     </Row> 
              </Form>
			</div>
		);
	}
}
Flooradd = Form.create()(Flooradd);

export default Flooradd;