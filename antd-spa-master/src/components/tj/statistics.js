import React from 'react';
import {Table,Button,Dropdown,Icon,Modal,Menu,Input} from 'antd';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import Static from '../static/Static';
let that;
export default class Statistics extends React.Component {
	constructor(props) {
		super(props);
		that=this;
		 this.state={
              	data:[],
              	query:{wheres:[
              		{value:'parentId',opertionType:'equal',opertionValue:Static.school.sunwouId},
              		{value:'type',opertionType:'equal',opertionValue:"学校商铺日志"},
              		{value:'isDelete',opertionType:'equal',opertionValue:false}
              		],
              		pages:{currentPage:1,size:10},
              		sorts:[{value:"time",asc:false}]
              	},
              	total:0,
              	visible:false,
              	modalkey:0,
              	floorDefault:[],
              	  trigger:'click'
          }
          this.getData();
	};
    getData(){
         Static.Loading();
		Static.request('daylog/find',{query:JSON.stringify(that.state.query)},function(res){
               that.setState({
               	   data:res.params.dayLogs,
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
    	query.wheres[3]={value:name,opertionType:'equal',opertionValue:this.state.search};
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
    	   localStorage.setItem("tjTime",this.state.temp.time) ;
    	   Static.history.push({pathname:"/app/shopstatistics"});
    	}
    };
    dropdownclick(record){
            that.setState({temp:record});
    };
	render() {
		const that=this;
		const menu = (
		  <Menu  onClick={that.menuClick.bind(that)}>
		    <Menu.Item key="1">查看详情</Menu.Item>
		  </Menu>
		);
		const columns = [{
			  title: '日期',
			  key: 'time',
			  dataIndex:'time',
			   filterDropdown: (
		        <div className="custom-filter-dropdown">
		          <Input
		            placeholder="Search"
		            onChange={this.search.bind(this)}
		          />
		          <Button type="primary" onClick={this.onSearch.bind(this,"time")}>Search</Button>
		        </div>
		      ),
			},{
			  title: '交易额',
			  key: 'totalIn',
			  dataIndex:'totalIn'
			},{
			  title: '平台所得',
			  key: 'appGet',
			  dataIndex:'appGet',
			  render(text,record){
			  	let rs=(record.appGet+record.agentGet).toFixed(2);
			  	return rs;
			  }
			},{
			  title: '商铺所得',
			  key: 'selfGet',
			  dataIndex:'selfGet'
			},{
			  title: '配送员所得',
			  key: 'senderGet',
			  dataIndex:'senderGet'
			},{
			  title: '满减优惠',
			  key: 'fullCut',
			  dataIndex:'fullCut'
			},{
			  title: '商品折扣',
			  key: 'discount',
			  dataIndex:'discount'
			},{
			  title: '配送费',
			  key: 'sendPrice',
			  dataIndex:'sendPrice'
			},{
			  title: '餐盒费',
			  key: 'boxPrice',
			  dataIndex:'boxPrice'
			},{
			  title: '商品费用',
			  key: 'productPrice',
			  dataIndex:'productPrice'
			},{
			  title: '外卖订单总数',
			  key: 'takeOutNumber',
			  dataIndex:'takeOutNumber'
			},{
			  title: '堂食订单总数',
			  key: 'tSNumber',
			  dataIndex:'tSNumber'
			}/*,{
			  title: '是否支付商铺',
			  key: 'settlement',
			  render(text,record){
                        if(record.settlement)
                        	return <Tag color="green">已支付</Tag>;
                        else
                            return <Tag color="red">未支付</Tag>;
			  },
			}*//*,{
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
			}*/,{
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
			    <BreadcrumbCustom paths={['首页','学校统计','']}/>
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
