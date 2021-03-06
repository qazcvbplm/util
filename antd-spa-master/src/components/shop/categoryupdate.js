import React from 'react';
import {Form,Input,Row,Button,message} from 'antd';
import Static from '../static/Static';

const FormItem = Form.Item;
class Categoryupdate extends React.Component {

	constructor(props) {
		super(props);
		this.state={
            
		};
	};
	componentWillUpdate(nextProps, nextState){
		
	}
    submit(){
        let fields=this.props.form.getFieldsValue();
        if(fields.name){
        	Static.request("/category/update",{
                 name:fields.name,
                 sunwouId:this.props.type.sunwouId
        	},function(res){
                if(res.code){
                      message.success('更新成功');
                }else{
                	message.error('更新失败请重试')
                }
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
			  <Form >
			     <Row align="middle">
	                   <FormItem label="分类名字"
	                   	{...formItemLayout}
				        >
				         {getFieldDecorator('name',{initialValue:this.props.type.name})(<Input  placeholder='请输入' />)}
				        </FormItem>
			     </Row> 
			     <Row align="middle">
			          <Row>
			            <center><Button type="primary" onClick={this.submit.bind(this)}>确定</Button></center>
			          </Row>
			     </Row> 
              </Form>
			</div>
		);
	}
}
Categoryupdate = Form.create()(Categoryupdate);

export default Categoryupdate;