import React from 'react';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import {Form,Input,Row,Button,message} from 'antd';
import Static from '../static/Static';
import './shop.css';

const FormItem = Form.Item;
class Categoryadd extends React.Component {

	constructor(props) {
		super(props);
		this.state={

		};
	};
    submit(){
        let fields=this.props.form.getFieldsValue();
        if(fields.name){
        	Static.request("/category/add",function(res){
                 console.log(res)
        	});
        }else{
			message.error('请输入分类名字');
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
			  <BreadcrumbCustom paths={['首页','店铺管理','添加店铺分类']}/>
			  <Form className="form">
			     <Row align="middle">
	                   <FormItem label="分类名字"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('name')(<Input placeholder="分类名字" />)}
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
Categoryadd = Form.create()(Categoryadd);

export default Categoryadd;