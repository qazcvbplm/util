import React from 'react';
import {Form,Input,Row,Button,message,Divider,Select,Modal,Col,InputNumber} from 'antd';
import Static from '../static/Static';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
const FormItem = Form.Item;
const Option =Select.Option;
let that;
class Withdrawals extends React.Component {

	constructor(props) {
		super(props);
		that=this;
		this.state={
             visible:true,
             codeBtn:'获取'
		};
	};
    submit(){
         let fields=this.props.form.getFieldsValue();
         fields.schoolId=Static.school.sunwouId;
         fields.secert=that.state.secert;
         if(fields.amount<1){
         	message.error("金额必须大于1");
         	return;
         }
	     if(fields.type==='零钱'){
	             if(!fields.openid){
	             	message.error("请填写用户openid");
	             	return;
	              }
	                Static.Loading();
             Static.request('/school/withdrawals',fields,function(res){
           				if(res.code){
           					message.success(res.msg);
           				}else{
           					message.error(res.msg);
           				}
           				Static.hideLoading();

           })  
         }
         if(fields.type==='银行卡'){
             if(!fields.bankNumber||!fields.name){
             	message.error("请填写卡信息");
             	return;
             }
             Static.Loading();
              Static.request('/school/withdrawals',fields,function(res){
           				if(res.code){
           					message.success(res.msg);
           				}else{
           					message.error(res.msg);
           				}
           				Static.hideLoading();

           		})  
         }

    };
    getcode(){

    		Static.request('/common/getcode',{phone:Static.school.phone},function(res){
           				if(res.code){
           					message.success("发送成功");
           				}else{
           					message.error(res.msg);
           				}

           })  
    };
    code(e){
            that.setState({code:e.target.value});
    };
    handleCancel(){
         
    };
    handleOk(){
    	Static.Loading();
    	Static.request('/common/checkcode',{phone:Static.school.phone,code:that.state.code},function(res){
           				if(res.code){
           					message.success("验证成功");
           					that.setState({secert:res.params.secert,visible:false});
           				}else{
           					message.error(res.msg);
           				}

           })
    	Static.hideLoading();
    };
	render() {
		const { getFieldDecorator} = this.props.form;
		 const formItemLayout  = {
		      labelCol: { span: 8},
		      wrapperCol: { span: 8},
		    };
		return (
			<div>
			<Modal
			     key={this.state.modalkey}
		          title="获取验证码"
		          visible={this.state.visible}
		          onOk={this.handleOk.bind(this)}
		          onCancel={this.handleCancel.bind(this)}
		        >
		          <Row>
		           <Col span={8}><Input onChange={this.code.bind(this)} placeholder="获取验证码" /></Col>
		          <Col span={4} offset={1}><Button  onClick={this.getcode.bind(this)}>{this.state.codeBtn}</Button></Col>
		          </Row>
		        </Modal>
			<BreadcrumbCustom paths={['首页','提现','']}/>
			<div className="form">
			  <Divider />
			  <Form >
			     <Row align="middle">
	                   <FormItem label="提现方式"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('type',{initialValue:'零钱'})(<Select >
																			<Option value="零钱">零钱</Option>
																			<Option value="银行卡">银行卡</Option>
																			</Select>)}
				        </FormItem>
			     </Row>
			     <Row align="middle">
	                   <FormItem label="选择银行"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('bankCode',{initialValue:'1003'})(<Select >
																			<Option value="1002">工商银行</Option>
																			<Option value="1005">农业银行</Option>
																			<Option value="1026" >中国银行</Option>
																			<Option value="1003">建设银行</Option>
																			</Select>)}
				        </FormItem>
			     </Row> 
			     <Row align="middle">
	                   <FormItem label="银行卡号"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('bankNumber',{initialValue:''})(<Input placeholder="银行卡号" />)}
				        </FormItem>
			     </Row> 
			     <Row align="middle">
	                   <FormItem label="银行卡姓名"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('name',{initialValue:''})(<Input  placeholder="银行卡姓名"  />)}
				        </FormItem>
			     </Row>
			      <Row align="middle">
	                   <FormItem label="用户openid"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('openid',{initialValue:''})(<Input  placeholder="用户openid"  />)}
				        </FormItem>
			     </Row>
			      <Row align="middle">
	                   <FormItem label="提现金额"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('amount',{initialValue:'0'})(<InputNumber  step="0.01"  />)}
				        </FormItem>
			     </Row>
			   
			     <Row align="middle">
			          <Row>
			            <center>
			            <Button type="primary" onClick={this.submit.bind(this)}>提现</Button>
			            </center>
			          </Row>
			     </Row> 
              </Form>
              <Divider />
			</div>
			</div>
		);
	}
}
Withdrawals = Form.create()(Withdrawals);

export default Withdrawals;