import React from 'react';
import {Table,Button,Icon,message,Row,Col,InputNumber,Divider } from 'antd';
import Static from '../static/Static';


export default class Fullcut extends React.Component {
	constructor(props) {
		super(props);
		let findurl=this.props.url+'/find';
		let updateurl=this.props.url+'/update';
		let addurl=this.props.url+'/add';
		let shopId=this.props.shopId;
		 this.state={
              	data:[],
              	addurl:addurl,
              	findurl:findurl,
              	updateurl:updateurl,
              	shopId:shopId,
              	full:1,
              	cut:1
          }
          this.getData();
	};
    getData(){
         let that=this;
		Static.request(that.state.findurl,{shopId:that.state.shopId},function(res){
			if(res.params.fullcuts){
				that.setState({
               	   data:res.params.fullcuts
               })
			}
               
		});
    };
   delete(record){
   	let that=this;
       Static.request(that.state.updateurl,{sunwouId:record.sunwouId,
        isDelete:true},function(res){
              if(res.code){
                   message.success("删除成功");
              }
               that.getData();
        });

   };
   full(e){
         this.setState({
              full:e
         })
   };
   cut(e){
         this.setState({
                cut:e
         })
   };
   add(){
        let that=this;
       Static.request(that.state.addurl,{shopId:that.state.shopId,full:that.state.full,cut:that.state.cut},function(res){
              if(res.code){
                   message.success("添加成功");
              }
              that.getData();
        });
   };
	render() {
    const that=this;
		const columns = [{
			  title: '满',
			  key: 'full',
			 dataIndex:'full'
			},{
			  title: '减',
			  key: 'cut',
			 dataIndex:'cut'
			},{
			  title: '操作',
			  key: '1',
			 render:function(text,record,index){
                 return  <div>
                 <Button type="danger"  onClick={that.delete.bind(that,record)}><Icon type="delete" />删除</Button>
                 </div>
			 }
			}];
		return (
			<div >
                <Row>
                	<Col span={8}><span>满：</span><InputNumber  min={1} max={100} defaultValue={1}  onChange={this.full.bind(this)} /></Col>
                	<Col span={8}><span>减：</span><InputNumber  min={1} max={100} defaultValue={1}  onChange={this.cut.bind(this)} /></Col>
                	<Col span={8}><Button type="primary" onClick={this.add.bind(this)}>添加</Button></Col>
                </Row>
                <Divider />
				<Table
				 rowKey="sunwouId" className="container"  columns={columns}  dataSource={this.state.data}></Table>
				
			</div>
		);
	}
}
