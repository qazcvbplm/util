import React from 'react';
import {Table,Button,Dropdown,Icon,Modal,Menu,message} from 'antd';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import Static from '../static/Static';
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
    		that.setState({visible:true})
    		return;
    	}
    	if(e.key==='2'){
    	}
      
    };
    dropdownclick(record){
            that.setState({temp:record});
    };
	render() {
		const that=this;
		const menu = (
		  <Menu  onClick={that.menuClick.bind(that)}>
		  <Menu.Item key="1">编辑</Menu.Item>
		    <Menu.Item key="2">关联商店</Menu.Item>
		  </Menu>
		);
		const columns = [{
			  title: '图片',
			  key: 'mediaUrl',
			  render(text, record) {
			   return  <div></div>;
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
