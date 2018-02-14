import React from 'react';
import {Table,Button,Dropdown,Icon,Modal,Menu,Tag,message} from 'antd';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import Static from '../static/Static';
let that;
export default class ShopApply extends React.Component {
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
		Static.request('shopapply/find',{query:JSON.stringify(that.state.query)},function(res){
               that.setState({
               	   data:res.params.shopApplys,
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
    	let pass=false;
    	if(e.key==='2'){
    		pass=true;
    	}
    	if(e.key==='3'){
    	}
    	    Static.Loading();
    		Static.request('shopapply/pass',{
                sunwouId:that.state.temp.sunwouId,
                pass:pass
    		},function(res){
    			message.success(res.msg);
                 that.getData();
    		})

      
    };
    dropdownclick(record){
            that.setState({temp:record});
    };
	render() {
		const that=this;
		const menu = (
		  <Menu  onClick={that.menuClick.bind(that)}>
		  <Menu.Item key="1">证件查看</Menu.Item>
		    <Menu.Item key="2">审核通过</Menu.Item>
		    <Menu.Item key="3">审核失败</Menu.Item>
		  </Menu>
		);
		const columns = [{
			  title: '姓名',
			  key: 'realName',
			  dataIndex:'realName'
			},{
			  title: '性别',
			  key: 'gender',
			  dataIndex:'gender'
			},{
			  title: '联系方式',
			  key: 'phone',
			  dataIndex:'phone'
			},{
			  title: '店铺名字',
			  key: 'shopName',
			  dataIndex:'shopName'
			},{
			  title: '店铺地址',
			  key: 'shopAddress',
			  dataIndex:'shopAddress'
			},{
			  title: '审核状态',
			  key: 'status',
         filters: [
        { text: '待审核', value: '待审核' },
        { text: '审核失败', value: '审核失败' },
        { text: '审核通过', value: '审核通过' },
      ],
      onFilter: (value, record) => record.status.includes(value),
			  render(text,record){
			  	if(record.status==='待审核'){
			  		return <Tag color="orange">{record.status}</Tag>;
			  	}
			  	if(record.status==='审核失败'){
			  		return <Tag color="red">{record.status}</Tag>;
			  	}
			  	if(record.status==='审核通过'){
			  		return <Tag color="green">{record.status}</Tag>;
			  	}
			  }
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
			    <BreadcrumbCustom paths={['首页','用户管理','商铺入驻管理']}/>
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
