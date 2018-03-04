import React from 'react';
import {Form,Input,Row,Button,message,Switch,Upload,Icon,Spin} from 'antd';
import Static from '../static/Static';
const FormItem = Form.Item;
class Article extends React.Component {

	constructor(props) {
		super(props);
		let shop={};
		let fileList=null;
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
        		title:'',
        		des:'',
        		zbf:'',
        		isShow:true,
        		schoolId:Static.school.sunwouId,
        		image:''
		      }
		}
        this.state={
        	uploadUrl:Static.FileIP+'file/up',
        	fileNumber:0,
        	shop:shop,
        	fileList:fileList,
        	loading:false
        }
	};
    submit(){
    	let that=this;
		let fields=this.props.form.getFieldsValue();
        let url='';
        if(this.state.shop.sunwouId){
					url='article/update';
					fields.sunwouId=this.state.shop.sunwouId;
					fields.shopImage=this.state.shop.shopImage;
        }else{
                   url='article/add';
        }
        this.setState({loading:true});
        fields.schoolId=this.state.shop.schoolId;
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

	render() {
		const { getFieldDecorator} = this.props.form;
		 const formItemLayout  = {
		      labelCol: { span: 8},
		      wrapperCol: { span: 8},
		    };
		return (
			<div >
			 <Spin spinning={this.state.loading} size="large">
			  <Form >
			     <Row align="middle">
	                   <FormItem label="商品图片"
	                   	{...formItemLayout}
				        >
				          <Upload
					          action={this.state.uploadUrl}
					          listType="picture-card"	
					           data={{type:'image',compress:true,compressd:0.5}}	
					          defaultFileList={this.state.fileList}	
					          onChange={this.fileup.bind(this)}
					        >
					          {this.state.shop.image===''?<Icon type="plus" />:null}
					        </Upload>
				        </FormItem>
			     </Row>
			     <Row align="middle">
	                   <FormItem label="标题"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('title',{initialValue:this.state.shop.title})(<Input placeholder="标题" />)}
				        </FormItem>
			     </Row> 
			     <Row align="middle">
	                   <FormItem label="描述"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('des',{initialValue:this.state.shop.des})(<Input placeholder="描述" />)}
				        </FormItem>
			     </Row> 
			     <Row align="middle">
	                   <FormItem label="主办方"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('zbf',{initialValue:this.state.shop.zbf})(<Input placeholder="主办方" />)}
				        </FormItem>
			     </Row> 
			      <Row align="middle">
	                   <FormItem label="是否显示"
	                   	{...formItemLayout}
				        >
				          {getFieldDecorator('isShow',{initialValue:this.state.shop.isShow})(
				          	<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={this.state.shop.isShow} />)}
				        </FormItem>
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
Article = Form.create()(Article);

export default Article;