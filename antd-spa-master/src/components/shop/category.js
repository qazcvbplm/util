import React from 'react';
import {Table,Button,Icon,message,Row,Col,Divider,Input,Modal,Spin} from 'antd';
import Static from '../static/Static';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
export default class Category extends React.Component {
	constructor(props) {
		super(props);
    let query=JSON.parse(localStorage.getItem('category'));
		let url=query.url;
		let type=query.type;
		let shopId=query.shopId;
    let add=query.add;
		 this.state={
              	data:[],
                url:url,
              	shopId:shopId,
              	type:type,
                add:add,
                temp:{name:''},
                query:{
                  wheres:[
                  {value:'shopId',opertionType:'equal',opertionValue:shopId},
                  {value:'type',opertionType:'equal',opertionValue:type},
                  {value:'isDelete',opertionType:'equal',opertionValue:false}
                  ],
                },
                name:'',
                updatevisible:false,
                key:0,
                loading:false
          }
          this.getData();
	};
    getData(){
         let that=this;
		Static.request(that.state.url+'/find',{query:JSON.stringify(that.state.query)},function(res){
			if(res.params.categorys){
				that.setState({
               	   data:res.params.categorys,
                   loading:false
               })
			}            
		});
    };
   delete(record){
   	let that=this;
     that.setState({loading:true})
       Static.request(that.state.url+'/update',{sunwouId:record.sunwouId,
        isDelete:true},function(res){
              if(res.code){
                   message.success("删除成功");
                   that.getData();
              }
        });
   };
   start(e){
         this.setState({
              name:e.target.value
         })
   };
   add(){
        let that=this;
        that.setState({loading:true})
       Static.request(that.state.url+that.state.add,{shopId:that.state.shopId,name:that.state.name},function(res){
              if(res.code){
                   message.success("添加成功");
              }
              that.getData();
        });
   };
   update(){
       let that=this;
       Static.request(that.state.url+'/update',{
        sunwouId:that.state.temp.sunwouId,
        name:that.state.name},function(res){
              if(res.code){
                   message.success("更新成功");
              }
              that.getData();
        });
   };
   showModal(name,record){
       if(name==='update'){
        this.setState({
          updatevisible:true,
          temp:record,
          key:this.state.key+1
        })
       }
   };
   handleCancel(e){
      this.getData();
        this.setState({
          updatevisible:false
        });
   };
   product(record){
         Static.history.push({pathname:'productlist',query:{categoryId:record.sunwouId}})
   };
	render() {
    const that=this;
		const columns = [{
			  title: '分类名',
			  key: 'name',
			 dataIndex:'name'
			},{
			  title: '操作',
			  key: '1',
			 render:function(text,record,index){
                 return  <div>
                  <Button type="success" onClick={that.product.bind(that,record)}><Icon type="edit" />编辑菜品</Button>&nbsp;
                 <Button type="primary" onClick={that.showModal.bind(that,'update',record)}><Icon type="edit" />编辑</Button>&nbsp;
                 <Button type="danger"  onClick={that.delete.bind(that,record)}><Icon type="delete" />删除</Button>
                 </div>
			 }
			}];
		return (
      <div>
        <Spin size="large" spinning={this.state.loading} >
      <Modal
          key={this.state.key}
          title="编辑"
          visible={this.state.updatevisible}
           onCancel={this.handleCancel.bind(that)}
           onOk={this.update.bind(this)}
        >
          <Input onChange={this.start.bind(this)} defaultValue={this.state.temp.name}/>
        </Modal>
      <BreadcrumbCustom paths={['首页','店铺管理','添加分类']}/>
  			<div className="form">
                  <Row>
                    <Col span={2}>分类名：</Col> 
                  	<Col span={6}><Input onChange={this.start.bind(this)}  /></Col>           
                  	<Col offset={1} span={10}><Button type="primary" onClick={this.add.bind(this)}>添加</Button></Col>
                  </Row>
                  <Divider />
  				<Table
  				 rowKey="sunwouId" className="container"  columns={columns}  dataSource={this.state.data}></Table>
  				
  			</div>
        </Spin>
      </div>
		);
	}
}
