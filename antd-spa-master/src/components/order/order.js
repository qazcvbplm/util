import React from 'react';
import {Table,Button,Dropdown,Icon,Modal,Menu,Input} from 'antd';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import Static from '../static/Static';
let that;
export default class Order extends React.Component {
	constructor(props) {
		super(props);
		that=this;
		 this.state={
              	data:[],
              	query:{wheres:[
              		{value:'schoolId',opertionType:'equal',opertionValue:Static.school.sunwouId},
              		{value:'isDelete',opertionType:'equal',opertionValue:false},
              		{value:'type',opertionType:'equal',opertionValue:localStorage.getItem("orderType")}
              		],
              		pages:{currentPage:1,size:10},
              		sorts:[{value:"createTime",asc:false}]
              	},
              	total:0,
              	type:localStorage.getItem("orderType"),
              	visible:false,
              	modalkey:0,
              	floorDefault:[],
          }
          this.getData();
          Static.order=this;
	};
    getData(){
         Static.Loading();
		Static.request('order/find',{query:JSON.stringify(that.state.query)},function(res){
               that.setState({
               	   data:res.params.orders,
               	   total:res.params.total
               })
               Static.hideLoading();
		});

    };
    componentWillUnmount(){
        Static.order=null;
    };
    search(e){
         this.setState({search:e.target.value});
    };
    onSearch(name){
    	let query=this.state.query;
    	query.wheres[3]={value:name,opertionType:'like',opertionValue:this.state.search};
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
    		 
    	}

    	if(e.key==='2'){

    	}
    	if(e.key==='3'){
    	}
    	   
      
    };
    dropdownclick(record){
            that.setState({temp:record});
    };
	render() {
		const that=this;
		const menu = (
		  <Menu  onClick={that.menuClick.bind(that)}>
		    <Menu.Item key="1"></Menu.Item>
		  </Menu>
		);
		const columns = [{
			  title: '订单号',
			  key: 'sunwouId',
			  dataIndex:'sunwouId',
			  filterDropdown: (
		        <div className="custom-filter-dropdown">
		          <Input
		            placeholder="Search"
		            onChange={this.search.bind(this)}
		          />
		          <Button type="primary" onClick={this.onSearch.bind(this,"sunwouId")}>Search</Button>
		        </div>
		      ),
			},{
			  title: '商店名称',
			  key: 'shopName',
			  dataIndex:'shopName',
			  filterDropdown: (
		        <div className="custom-filter-dropdown">
		          <Input
		            placeholder="Search"
		            onChange={this.search.bind(this)}
		          />
		          <Button type="primary" onClick={this.onSearch.bind(this,"shopName")}>Search</Button>
		        </div>
		      ),
			},{
			  title: '实付金额',
			  key: 'total',
			  dataIndex:'total'
			},{
			  title: '预定时间',
			  key: 'reserveTime',
			  dataIndex:'reserveTime'
			},{
			  title: '商品详情',
			  key: 'xq',
			  render(text,record){
			  	let rs='';
			  	if(record.type==='外卖订单'||record.type==='堂食订单'){
                    for(let i=0;i<record.orderProduct.length;i++){
                  	     rs+=record.orderProduct[i].product.name+
                  	     '('+record.orderProduct[i].attribute.name+'x'+record.orderProduct[i].number+')';
                  }
                  return rs;
			  	}
                if(record.type==='跑腿订单'){
                    rs=record.remark;
                  }
                  return rs;
			  	} 
			  
			},{
			  title: '联系人',
			  key: 'address.concatName',
			  render(text, record) {
			  	let rs=record.address.concatName
			   return  rs;
			  },
			},{
			  title: '联系电话',
			  key: 'address.phone',
			  render(text, record) {
			  	let rs=record.address.concatPhone
			   return  rs;
			  },
			},{
			  title: '配送地址',
			  key: 'address.detail',
			  render(text, record) {
			  	let rs=record.address.detail
			   return  rs;
			  },
			},{
			  title: '配送员信息',
			  key: 'sender',
			  render(text, record) {
			  	let rs="";
			  	if(record.senderId){
			  		rs+=record.senderName+'('+record.senderPhone+')'
			  	}
			   return  rs;
			  },
			},{
			  title: '流水号',
			  key: 'waterNumber',
			   dataIndex:'waterNumber'
			},{
			  title: '状态',
			  key: 'status',
			  dataIndex: 'status',
		     filterDropdown: (
		        <div className="custom-filter-dropdown">
		          <Input
		            placeholder="Search"
		            onChange={this.search.bind(this)}
		          />
		          <Button type="primary" onClick={this.onSearch.bind(this,"status")}>Search</Button>
		        </div>
		      ),
		 },
			{
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
		          title=""
		          visible={this.state.visible}
		          onOk={this.handleOk.bind(this)}
		          onCancel={this.handleCancel.bind(this)}
		        >
		        </Modal>
			    <BreadcrumbCustom paths={['首页','订单管理','']}/>
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
