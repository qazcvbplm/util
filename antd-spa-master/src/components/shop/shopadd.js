import React from 'react';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import {Form,Input,Row,Button,message,Switch,Select,Upload, Icon,InputNumber } from 'antd';
import Static from '../static/Static';
import './shop.css';

const Option =Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
class Shopadd extends React.Component {

	constructor(props) {
		super(props);
		let shop={};
		let fileList=null;
		let fromclass='form';
		if(props.params){
			shop=props.params;
			shop.fullCutRate*=100;
			shop.productDiscountRate*=100;
			shop.rate*=100;
			fileList=[];
			fromclass='';	
			fileList.push({
		      uid: -1,
		      name: shop.sunwouId,
		      status: 'done',
		      url: shop.shopImage,
		    });
		}else{
            shop={
        		shopName:'',
        		open:false,
        		shopPhone:'',
        		bankNumber:'',
        		shopUserName:'',
        		shopPassWord:'',
        		shopImage:'',
                categoryId:'',
                startPrice:0.0,
                boxPrice:0.0,
                sendPrice:0.0,
                sendTime:0,
                fullCutRate:100,
                productDiscountRate:100,
                rate:10,
                sales:0,
                topTitle:'',
                address:'',
                sendModel:true,
                getModel:false,
                backCode:1003,
                realName:''
		      }
		}
        this.state={
        	categorys:[],
        	uploadUrl:Static.FileIP+'file/up',
        	fileNumber:0,
        	shop:shop,
        	fileList:fileList,
        	fromclass:fromclass
        }
	};
	componentDidMount(){
       let query={
			wheres:[
			{value:'schoolId',opertionType:'equal',opertionValue:Static.school.sunwouId},
			{value:'type',opertionType:'equal',opertionValue:'店铺分类'},
			{value:'isDelete',opertionType:'equal',opertionValue:false},
			]
		}
		let that=this;
		Static.request('/category/find',{query:JSON.stringify(query)},function(res){
                 that.setState({
                   categorys:res.params.categorys
				 });  
		});
	};
    submit(){
    	Static.Loading();
		let fields=this.props.form.getFieldsValue();
        fields.schoolId=Static.school.sunwouId;
        fields.shopImage=this.state.shop.shopImage;
        let url='';
        if(this.state.shop.sunwouId){
					url='shop/update';
					fields.sunwouId=this.state.shop.sunwouId;
					fields.shopImage=this.state.shop.shopImage;
        }else{
                   url='shop/add';
        }
        Static.request(url,fields,function(res){
                if(res.code){
                    message.success("操作成功");
                }else{
                	message.error(res.msg);
                }
                Static.hideLoading();
        })
    };
    fileup(e){
    	let shop=this.state.shop;
        if(e.file.status==='done'){
        	shop.shopImage=Static.ImageIP+e.file.response.params.path;
        }
        if(e.file.status==='removed'){
        	shop.shopImage='';
        }
        this.setState({
               shop:shop,
        	})
    };
	render() {
		const { getFieldDecorator} = this.props.form;
		 const formItemLayout  = {
		      labelCol: { span: 8},
		      wrapperCol: { span: 8},
		    };
		return (
			<div >
			  {this.state.shop.sunwouId===null?<BreadcrumbCustom paths={['首页','店铺管理','添加店铺']}/>:null}
			  <Form className={this.state.fromclass}>
			  	 <Row align="middle">
	                   <FormItem label="店铺分类"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('categoryId',{initialValue:this.state.shop.categoryId})(<Select placeholder="店铺分类" >
				          	{this.state.categorys.map(item => <Option key={item.sunwouId} value={item.sunwouId}>{item.name}</Option>)}</Select>)}
				        </FormItem>
			     </Row> 
			     <Row align="middle">
	                   <FormItem label="店铺图片"
	                   	{...formItemLayout}
				        >
				          <Upload
					          action={this.state.uploadUrl}
					          listType="picture-card"	
					          data={{type:'image'}}	
					          defaultFileList={this.state.fileList}	
					          onChange={this.fileup.bind(this)}
					        >
					          {this.state.shop.shopImage===''?<Icon type="plus" />:null}
					        </Upload>
				        </FormItem>
			     </Row>
			     <Row align="middle">
	                   <FormItem label="店铺名字"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('shopName',{initialValue:this.state.shop.shopName})(<Input placeholder="店铺名字" />)}
				        </FormItem>
			     </Row> 
			      <Row align="middle">
	                   <FormItem label="店铺手机号码"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('shopPhone',{initialValue:this.state.shop.shopPhone})(<Input placeholder="店铺手机号码" />)}
				        </FormItem>
			     </Row>
			      {/*<Row align="middle">
	                   <FormItem label="银行"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('bankCode',{initialValue:this.state.shop.bankCode})(<Select >
																							      <Option value="1002">工商银行</Option>
																							      <Option value="1005">农业银行</Option>
																							      <Option value="1026" >中国银行</Option>
																							      <Option value="1003">建设银行</Option>
																							    </Select>)}
				        </FormItem>
			     </Row>
			     <Row align="middle">
	                   <FormItem label="店铺银行卡号"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('bankNumber',{initialValue:this.state.shop.bankNumber})(<Input placeholder="店铺银行卡号" />)}
				        </FormItem>
			     </Row>
			     <Row align="middle">
	                   <FormItem label="银行卡姓名"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('realName',{initialValue:this.state.shop.realName})(<Input placeholder="银行卡姓名" />)}
				        </FormItem>
			     </Row>*/}
			     <Row align="middle">
	                   <FormItem label="商铺登录账号"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('shopUserName',{initialValue:this.state.shop.shopUserName})(<Input placeholder="商铺登录账号" />)}
				        </FormItem>
			     </Row>
			     <Row align="middle">
	                   <FormItem label="商铺登录密码"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('shopPassWord',{initialValue:this.state.shop.shopPassWord})(<Input placeholder="商铺登录密码" />)}
				        </FormItem>
			     </Row>
			     <Row align="middle">
	                   <FormItem label="营业状态"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('open',{initialValue:this.state.shop.open})(
				          	<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={this.state.shop.open} />)}
				        </FormItem>
			     </Row>
			     {/*<Row align="middle">
	                   <FormItem label="店铺评分"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('score',{initialValue:0.5})( <Rate allowHalf  />)}
				        </FormItem>
			     </Row>*/}
			     <Row align="middle">
	                   <FormItem label="起送费"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('startPrice',{initialValue:this.state.shop.startPrice})( <InputNumber  formatter={value => `${value}元`} min={0} max={100} step={0.1} />)}
				        </FormItem>
			     </Row>
			     <Row align="middle">
	                   <FormItem label="餐盒费"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('boxPrice',{initialValue:this.state.shop.boxPrice})( <InputNumber formatter={value => `${value}元`} min={0} max={100} step={0.1} />)}
				        </FormItem>
			     </Row>
			     <Row align="middle">
	                   <FormItem label="配送费"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('sendPrice',{initialValue:this.state.shop.sendPrice})( <InputNumber formatter={value => `${value}元`} min={0} max={100} step={0.1} />)}
				        </FormItem>
			     </Row>
			      <Row align="middle">
	                   <FormItem label="平均配送时间"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('sendTime',{initialValue:this.state.shop.sendTime})( <InputNumber formatter={value => `${value}分钟`} min={0} max={100}  />)}
				        </FormItem>
			     </Row>
			     <Row align="middle">
	                   <FormItem label="销量"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('sales',{initialValue:this.state.shop.sales})( <InputNumber formatter={value => `${value}件`} min={0}   />)}
				        </FormItem>
			     </Row>
			      <Row align="middle">
	                   <FormItem label="满减优惠商家承担"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('fullCutRate',{initialValue:this.state.shop.fullCutRate})( <InputNumber formatter={value => `${value}%`} min={0} max={100} />)}
				        </FormItem>
			     </Row>
			     <Row align="middle">
	                   <FormItem label="商家折扣商家承担"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('productDiscountRate',{initialValue:this.state.shop.productDiscountRate})( <InputNumber formatter={value => `${value}%`} min={0} max={100}  />)}
				        </FormItem>
			     </Row>
			      <Row align="middle">
	                   <FormItem label="对商家抽成"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('rate',{initialValue:this.state.shop.rate})( <InputNumber formatter={value => `${value}%`} min={0} max={100}  />)}
				        </FormItem>
			     </Row>
			     <Row align="middle">
	                   <FormItem label="配送模式"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('sendModel',{initialValue:this.state.shop.sendModel})(
				          	<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={this.state.shop.sendModel} />)}
				        </FormItem>
			     </Row>
			      <Row align="middle">
	                   <FormItem label="自取模式"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('getModel',{initialValue:this.state.shop.getModel})(
				          	<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={this.state.shop.getModel} />)}
				        </FormItem>
			     </Row>
			      <Row align="middle">
	                   <FormItem label="店铺地址"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('address',{initialValue:this.state.shop.address})(<Input placeholder="店铺地址" />)}
				        </FormItem>
			     </Row>
			     <Row align="middle">
	                   <FormItem label="线下优惠活动"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('topTitle',{initialValue:this.state.shop.topTitle})(<TextArea placeholder="线下优惠活动" />)}
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
Shopadd = Form.create()(Shopadd);

export default Shopadd;