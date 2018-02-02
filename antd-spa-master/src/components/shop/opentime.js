import React from 'react';
import {Table,Button,Icon,message,Row,Col,Divider,TimePicker} from 'antd';
import Static from '../static/Static';
import moment from 'moment';

moment().startOf('hour').fromNow();
export default class Opentime extends React.Component {
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
              	start:'00:00',
              	end:'00:00'
          }
          this.getData();
	};
    getData(){
         let that=this;
		Static.request(that.state.findurl,{shopId:that.state.shopId},function(res){
			if(res.params.opentimes){
				that.setState({
               	   data:res.params.opentimes
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
                   that.getData();
              }
        });
   };
   start(e,value){
         this.setState({
              start:value
         })
   };
   end(e,value){
         this.setState({
                end:value
         })
   };
   add(){
        let that=this;
       Static.request(that.state.addurl,{shopId:that.state.shopId,start:that.state.start,end:that.state.end},function(res){
              if(res.code){
                   message.success("添加成功");
              }
              that.getData();
        });
   };
	render() {
    const that=this;
		const columns = [{
			  title: '开始',
			  key: 'start',
			 dataIndex:'start'
			},{
			  title: '结束',
			  key: 'end',
			 dataIndex:'end'
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
                	<Col span={8}><span>开始：</span><TimePicker format="HH:mm" onChange={this.start.bind(this)} defaultValue={moment('00:00', 'HH:mm')} /></Col>
                	<Col span={8}><span>结束：</span><TimePicker format="HH:mm" onChange={this.end.bind(this)} defaultValue={moment('00:00', 'HH:mm')} /></Col>
                	<Col span={8}><Button type="primary" onClick={this.add.bind(this)}>添加</Button></Col>
                </Row>
                <Divider />
				<Table
				 rowKey="sunwouId" className="container"  columns={columns}  dataSource={this.state.data}></Table>
				
			</div>
		);
	}
}
