import React from 'react';
import {Table,Button,Dropdown,Icon,Modal,Menu,message,Divider,Upload,Input,Row,Col} from 'antd';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import Static from '../static/Static';
import './carousel.css';
let that;
export default class Carousel extends React.Component {
	constructor(props) {
		super(props);
		that=this;
		let type=localStorage.getItem("carouselType");
		 this.state={
              	data:[],
              	query:{wheres:[
              		{value:'schoolId',opertionType:'equal',opertionValue:Static.school.sunwouId},
              		{value:'type',opertionType:'equal',opertionValue:type},
              		{value:'isDelete',opertionType:'equal',opertionValue:false}
              		],
              		pages:{currentPage:1,size:10}},
              	total:0,
              	visible:false,
              	modalkey:0,
              	uploadUrl:Static.FileIP+'/file/up',
              	trigger:'click',
              	type:type,
              	show:null
          }
          Static.carousel=this;
          this.getData();
	};
	 componentWillUnmount(){
        Static.carousel=null;
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
    	   if(!that.state.path){
               message.error('请输入路径');
               return;
         }else
         {
           Static.request('/carousel/update',{
            sunwouId:that.state.temp.sunwouId,action:that.state.action,actionPath:that.state.path,
            name:that.state.name
          },function(res){
          if(res.code){
             message.success("操作成功");
                  that.getData();
              }
            })
         }
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
    	if(e.key==='3'){
        let show;
        show=<Input placeholder="输入跳转路径" onChange={e => this.setState({path:e.target.value})} />
        that.setState({show:show,visible:true,action:'跳转'});
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
        let data={mediaUrl:image,schoolId:Static.school.sunwouId,type:that.state.type};
        if(e.file.status==='done'){
                  if(this.state.type==='功能页面'){
                    if(!this.state.name){
                      message.error('请输入标题');
                      return;
                    }else{
                      data.name=this.state.name;
                    }
                }
        	image=Static.ImageIP+e.file.response.params.path;
            Static.request('/carousel/add',data,function(res){
                  message.success("添加成功");
                  that.getData();
            })
        }
    };
    title(e){
           this.setState({name:e.target.value});
    };
	render() {
		const that=this;
		const menu = (
		  <Menu  onClick={that.menuClick.bind(that)}>
		    <Menu.Item key="1">删除</Menu.Item>
		    <Menu.Item key="2">关联商店</Menu.Item>
		    <Menu.Item key="3">跳转路径</Menu.Item>
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
        title: '事件内容',
        key: 'actionPath',
        dataIndex: 'actionPath'
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
           closable={false}
			        key={this.state.modalkey}
		          visible={this.state.visible}
		          onOk={this.handleOk.bind(this)}
		          onCancel={this.handleCancel.bind(this)}
		        >
		        {this.state.show}
		        </Modal>
			    <BreadcrumbCustom paths={['首页','轮播图管理','']}/>
			     <div className="form">
           <Row>
			       <Col span={8}>
             {this.state.type==='功能页面'?<Input onChange={this.title.bind(this)} placeholder="标题" />:null}
             </Col>
             <Col span={8} offset={1}>
		           <Upload
					          action={this.state.uploadUrl}
					          data={{type:'image'}}	
					          onChange={this.fileup.bind(this)}
					        >
					  <Button><Icon type="upload" />选择图片</Button>
					</Upload>
          </Col>
          </Row>
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
