import React from 'react';
import {Table,Button,Icon,Modal,message} from 'antd';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import Static from '../static/Static';
import Categoryupdate from './categoryupdate';
export default class Categorylist extends React.Component {
	constructor(props) {
		super(props);
		 this.state={
              	data:[],
              	query:{
              		wheres:[
              		{value:'type',opertionType:'equal',opertionValue:this.props.location.query.type},
              		{value:'isDelete',opertionType:'equal',opertionValue:false}
              		],
              		pages:{currentPage:1,size:10}
                },
              	total:0,
                deletevisible:false,
                updatevisible:false,
                refresh:false,
                key:0
          }
          this.getData();
	};
    getData(){
         let that=this;
		Static.request('category/find',{query:JSON.stringify(that.state.query)},function(res){
               that.setState({
               	   data:res.params.categorys,
               	   total:res.params.total
               })
		});
    };
    search(e){
         this.state.search=e.target.value;
    };
    onSearch(name){
    	let obj=[{value:name,opertionType:'like',opertionValue:this.state.search}];
 		this.state.query.wheres=obj;
 		this.getData();
    };
    handleCancel(e){
      this.getData();
        this.setState({
          deletevisible: false,
          updatevisible:false
        });
   };
   showModal(name,record){
       if(name==='delete'){
        this.setState({
          deletevisible:true,
          temp:record
        })
       }
       if(name==='update'){
        this.setState({
          updatevisible:true,
          temp:record,
          key:this.state.key+1
        })
       }
   };
   delete(){
       Static.request("/category/update",{sunwouId:this.state.temp.sunwouId,
        isDelete:true},function(res){
              if(res.code){
                   message.success("删除成功");
              }
        });
   };
	render() {
    const that=this;
		const columns = [{
			  title: '分类名字',
			  key: 'name',
			 dataIndex:'name'
			},{
			  title: '操作',
			  key: '1',
			 render:function(text,record,index){
                 return  <div>
                 <Button type="primary" onClick={that.showModal.bind(that,'update',record)}><Icon type="edit" />编辑</Button>&nbsp;
                 <Button type="danger"  onClick={that.showModal.bind(that,'delete',record)}><Icon type="delete" />删除</Button>
                 </div>
			 }
			}];
		return (
			<div >
        <Modal
          title="是否确定删除"
          visible={this.state.deletevisible}
          onOk={this.delete.bind(that)}
          onCancel={this.handleCancel.bind(that)}
        >
        </Modal>
        <Modal
          key={this.state.key}
          title="编辑"
          visible={this.state.updatevisible}
           onCancel={this.handleCancel.bind(that)}
          footer={null}
        >
        <Categoryupdate type={this.state.temp} />
        </Modal>
			    <BreadcrumbCustom paths={['首页','用户管理','店铺分类列表']}/>
				<Table  pagination={{
                    pageSize:this.state.query.pages.size,
                    total:this.state.total,
                    showTotal: function (total) {  //设置显示一共几条数据
			            return '共 ' + total + ' 条数据'; 
			        },
			        onChange:function(page,pagesize){
			        	let query=this.state.query;
			        	query.pages.currentPage=page;
			        	query.pages.size=pagesize;
                         this.setState({
                         	query:query
                         });
                         this.getData();
			        }.bind(this)
				}}
				 rowKey="sunwouId" className="container"  columns={columns}  dataSource={this.state.data}></Table>
				
			</div>
		);
	}
}
