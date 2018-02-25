import React from 'react';
import {Table,Button,Dropdown,Icon,Modal,Menu,message,Divider,Upload} from 'antd';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import Static from '../static/Static';
import './carousel.css';
let that;
export default class Carousel extends React.Component {
	constructor(props) {
		super(props);
		that=this;
		 this.state={
              	data:[],
              	query:{wheres:[
              		{value:'schoolId',opertionType:'equal',opertionValue:Static.school.sunwouId},
              		{value:'isDelete',opertionType:'equal',opertionValue:false}
              		],
              		pages:{currentPage:1,size:10}},
              	total:0,
              	visible:false,
              	modalkey:0,
              	uploadUrl:Static.FileIP+'/file/up',
              	trigger:'click'
          }
          this.getData();
	};
    getData(){
        Static.Loading();
			Static.request('carousel/find',{query:JSON.stringify(that.state.query)},function(res){
	               that.setState({
	               	   data:res.params.carousels,
	               	   total:res.params.total
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
    handleCancel(){
         this.setState({
         	visible:false,
         	modalkey:this.state.modalkey+1,
         })
    };
    handleOk(){
    	
    };
    menuClick(e){
    	if(e.key==='1'){
    		 Static.request('/carousel/update',{sunwouId:that.state.temp.sunwouId,isDelete:true},function(res){
    		 	if(res.code){
    		 	  message.success("删除成功");
                  that.getData();
              }
            })
    		return;
    	}
    	if(e.key==='2'){
    		return;
    	}
      
    };
    dropdownclick(record){
            that.setState({temp:record});
    };
    showModal(action){
    	that.setState({visible:true,action:action})
    };
      fileup(e){
      	let image='';
        if(e.file.status==='done'){
        	image=Static.ImageIP+e.file.response.params.path;
            Static.request('/carousel/add',{mediaUrl:image,schoolId:Static.school.sunwouId},function(res){
                  message.success("添加成功");
                  that.getData();
            })
        }
    };
	render() {
		const that=this;
		const menu = (
		  <Menu  onClick={that.menuClick.bind(that)}>
		    <Menu.Item key="1">删除</Menu.Item>
		    <Menu.Item key="2">关联商店</Menu.Item>
		  </Menu>
		);
		const columns = [{
			  title: '图片',
			  key: 'mediaUrl',
			  render(text, record) {
			   return  <img alt="t" className="carousel"  src={record.mediaUrl}></img>;
			  },
			},{
			  title: '点击事件',
			  key: 'action',
			  render(text, record) {
			  	if(record.action){
			  		return record.action;
			  	}else{
                    return '暂无';
			  	}
			  },
			},{
			  title: '操作',
			  key: 'opertion',
			  render(text, record) {
			   return  <Dropdown trigger={that.state.trigger} overlay={menu} onClick={that.dropdownclick.bind(that,record)}>
					      <Button type="primary">
					        <Icon type="tool" /> <Icon type="down" />
					      </Button>
					    </Dropdown>
			  },
			}];
		return (
			<div >
			     <Modal
			     key={this.state.modalkey}
		          visible={this.state.visible}
		          onOk={this.handleOk.bind(this)}
		          onCancel={this.handleCancel.bind(this)}
		        >
		        
		        </Modal>
			    <BreadcrumbCustom paths={['首页','轮播图管理','']}/>
			     <div className="form">
		           <Upload
					          action={this.state.uploadUrl}
					          data={{type:'image'}}	
					          onChange={this.fileup.bind(this)}
					        >
					  <Button><Icon type="upload" />添加轮播图</Button>
					</Upload>
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
