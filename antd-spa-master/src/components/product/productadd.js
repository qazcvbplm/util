import React from 'react';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import {Form,Input,Row,Button,message,Switch,Upload,Icon,InputNumber,List,Col,Spin} from 'antd';
import Static from '../static/Static';
const FormItem = Form.Item;
class Productadd extends React.Component {

	constructor(props) {
		super(props);
		let shop={};
		let fileList=null;
		let categoryId=props.categoryId;
		if(props.params){
			shop=props.params;
			shop.discount=shop.discount*100;
			fileList=[];
			fileList.push({
		      uid: -1,
		      name: "image",
		      status: 'done',
		      url: shop.image,
		    });
		}else{
            shop={
        		name:'',
        		boxFlag:false,
        		image:'',
        		discount:100,
        		sales:0,
        		attribute:[],
		      }
		}
        this.state={
        	uploadUrl:Static.FileIP+'file/up',
        	fileNumber:0,
        	shop:shop,
        	fileList:fileList,
        	attribute:shop.attribute,
        	categoryId:categoryId,
        	loading:false
        }
	};
    submit(){
    	let that=this;
		let fields=this.props.form.getFieldsValue();
        let url='';
        this.setState({loading:true});
        if(this.state.shop.sunwouId){
					url='product/update';
					fields.sunwouId=this.state.shop.sunwouId;
					fields.shopImage=this.state.shop.shopImage;
        }else{
        	if(this.state.attribute.length===0){
                       message.error('至少一个规格');
                       return;
        	}
                   url='product/add';
        }
        fields.attributes=JSON.stringify(this.state.attribute);
        fields.categoryId=this.state.categoryId;
        fields.image=this.state.shop.image;
        Static.request(url,fields,function(res){
                if(res.code){
                    message.success("操作成功");
                }else{
                	message.error(res.msg);
                }
                 that.setState({loading:false});
        })
    };
    fileup(e){
    	let shop=this.state.shop;
        if(e.file.status==='done'){
        	shop.image=Static.ImageIP+e.file.response.params.path;
        }
        if(e.file.status==='removed'){
        	shop.image='';
        }
          this.setState({
               shop:shop,
        	})
    };
    attName(e){
       this.setState({attName:e.target.value});
    };
    attPrice(e){
       this.setState({attPrice:e});
    };
    attadd(){
       this.state.attribute.push({name:this.state.attName,price:this.state.attPrice});
       this.setState({attribute:this.state.attribute});
    };
    remove(item){
       for(let i=0;i<this.state.attribute.length;i++){
       	        if(item.name===this.state.attribute[i].name){
       	        	this.state.attribute.splice(i,1);
       	        	this.setState({attribute:this.state.attribute});
       	        	break;
       	        }
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
			 <Spin spinning={this.state.loading} size="large">
			  {this.state.shop.sunwouId===null?<BreadcrumbCustom paths={['首页','商品管理','添加商品']}/>:null}
			  <Form >
			     <Row align="middle">
	                   <FormItem label="商品图片"
	                   	{...formItemLayout}
				        >
				          <Upload
					          action={this.state.uploadUrl}
					          listType="picture-card"	
					          data={{type:'image'}}	
					          defaultFileList={this.state.fileList}	
					          onChange={this.fileup.bind(this)}
					        >
					          {this.state.shop.image===''?<Icon type="plus" />:null}
					        </Upload>
				        </FormItem>
			     </Row>
			     <Row align="middle">
	                   <FormItem label="商品名字"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('name',{initialValue:this.state.shop.name})(<Input placeholder="店铺名字" />)}
				        </FormItem>
			     </Row> 
			     <Row align="middle">
	                   <FormItem label="是否计算餐盒费"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('boxFlag',{initialValue:this.state.shop.boxFlag})(
				          	<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={this.state.shop.boxFlag} />)}
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
	                   <FormItem label="折扣"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('discount',{initialValue:this.state.shop.discount})( <InputNumber formatter={value => `${value}%`} min={0} max={100}  />)}
				        </FormItem>
			     </Row>
			     <Row align="middle">
				     <Col span={2} >规格</Col>
				     <Col offset={2} span={8} ><Input onChange={this.attName.bind(this)} placeholder='属性名称'/></Col>
				     <Col offset={2} span={6} ><InputNumber onChange={this.attPrice.bind(this)} step={0.01} min={0} placeholder='价格'/></Col>
				     <Col offset={2} span={2} ><Button onClick={this.attadd.bind(this)} type="primary">+</Button></Col>
				 </Row>
				 <Row>
                     <List
					      header={null}
					      dataSource={this.state.attribute}
					      renderItem={item => (<List.Item>规格：{item.name}--价格：{item.price}元&nbsp;&nbsp;
					      	<Button size="small" type="danger" onClick={this.remove.bind(this,item)} >移除</Button></List.Item>)}
					    />
				 </Row> 
			     <Row align="middle">
			          <Row>
			            <center><Button type="primary" onClick={this.submit.bind(this)}>确定</Button></center>
			          </Row>
			     </Row> 
              </Form>
              </Spin>
			</div>
		);
	}
}
Productadd = Form.create()(Productadd);

export default Productadd;