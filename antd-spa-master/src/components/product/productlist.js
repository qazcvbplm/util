import React from 'react';
import {Table,Button,Icon,Modal,message,Avatar,Tag,Input,Divider} from 'antd';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import Static from '../static/Static';
import Productadd from './productadd';
export default class Productlist extends React.Component {
	constructor(props) {
		super(props);
		 this.state={
              	data:[],
              	query:{
              		wheres:[
              		{value:'categoryId',opertionType:'equal',opertionValue:props.location.query.categoryId},
              		{value:'isDelete',opertionType:'equal',opertionValue:false}
              		],
              		pages:{currentPage:1,size:10}
                },
              	total:0,
                deletevisible:false,
                updatevisible:false,
                refresh:false,
                key:0,
                show:null,
                categoryId:props.location.query.categoryId
          }
          this.getData();
	};
    getData(){
         let that=this;
		Static.request('product/find',{query:JSON.stringify(that.state.query)},function(res){
               that.setState({
               	   data:res.params.products,
               	   total:res.params.total,
               })
               Static.hideLoading();
		});
    };
    search(e){
         this.setState({search:e.target.value});
    };
    onSearch(name){
      	let query=this.state.query;
        query.wheres=[{value:name,opertionType:'like',opertionValue:this.state.search}];
        this.setState({query:query});
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
       let show;
       if(name==='add'){
            show=<Productadd  categoryId={this.state.categoryId} />
       }
       if(name==='update'){
        show=<Productadd  categoryId={this.state.categoryId}  params={record}/>
       }

       this.setState({
        show:show,
        key:this.state.key+1,
        updatevisible:true,
       })
   };
   delete(record){
    let that=this;
    Static.Loading();
       Static.request("/product/update",{sunwouId:record.sunwouId,
        isDelete:true},function(res){
              if(res.code){
                   message.success("删除成功");
              }
              that.getData();
        });

   };
	render() {
    const that=this;
		const columns = [{
			  title: '图片',
			  render: (text, record) => (
			   <Avatar alt="图片" size="large" src={record.image} />
			  ),
			  key: 'avatarUrl',
			},{
			  title: '商品名字',
			  key: 'name',
			 dataIndex:'name',
       filterDropdown: (
            <div className="custom-filter-dropdown">
              <Input
                placeholder="Search"
                onChange={this.search.bind(this)}
              />
              <Button type="primary" onClick={this.onSearch.bind(this,"name")}>Search</Button>
            </div>
          ),
			},{
			  title: '商品折扣',
			  key: 'discount',
			 dataIndex:'discount',
       render: (text, record) => (
           text*100+'%'
        ),
			},{
			  title: '商品销量',
			  key: 'sales',
			 dataIndex:'sales'
			},{
			  title: '餐盒费',
			  key: 'boxFlag',
			  render(text, record){
               if(record.boxFlag){
                return <Tag color="green">需要</Tag>;
               }else{
                return <Tag color="red">不需要</Tag>;
               }
        },
			},{
        title: '上架状态',
        key: 'boxFlag',
        render(text, record){
               if(record.isShow){
                return <Tag color="green">上架中</Tag>;
               }else{
                return <Tag color="red">已下架</Tag>;
               }
        },
      },{
			  title: '操作',
			  key: '1',
			 render:function(text,record,index){
                 return  <div>
                 <Button type="primary" onClick={that.showModal.bind(that,'update',record)}><Icon type="edit" />编辑</Button>&nbsp;
                 <Button type="danger"  onClick={that.delete.bind(that,record)}><Icon type="delete" />删除</Button>
                 </div>
			 }
			}];
		return (
			<div >
{/*        <Modal
          title="是否确定删除"
          visible={this.state.deletevisible}
          onOk={this.delete.bind(that)}
          onCancel={this.handleCancel.bind(that)}
        >
        </Modal>*/}
        <Modal
          key={this.state.key}
          title="编辑"
          visible={this.state.updatevisible}
           onCancel={this.handleCancel.bind(that)}
          footer={null}
        >
        {this.state.show}
        </Modal>
			    <BreadcrumbCustom paths={['首页','店铺管理','商品列表']}/>
          <div className="form">
          <Button onClick={this.showModal.bind(this,'add')} type="primary" ><span><Icon type="plus" /></span></Button>
          <Divider />
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
			</div>
		);
	}
}
