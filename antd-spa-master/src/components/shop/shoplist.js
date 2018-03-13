import React from 'react';
import {Table,Input,Button,Avatar,Tag,Dropdown,Icon,Menu,Modal,message} from 'antd';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import Static from '../static/Static';
import Shopadd from './shopadd';
import Fullcut from './fullcut';
import Opentime from './opentime';
export default class Shoplist extends React.Component {
	constructor(props) {
		super(props);
		 this.state={
		 	    trigger:['click'],
              	data:[],
              	query:{wheres:[
              		{value:'schoolId',opertionType:'equal',opertionValue:Static.school.sunwouId},
              		{value:'isDelete',opertionType:'equal',opertionValue:false}
              		],
              		pages:{currentPage:1,size:10}},
              	total:0,
              	updatevisible:false,
              	Modalkey:0,
              	show:null,

          }
          this.getData();
	};
    getData(){
         let that=this;
		Static.request('shop/find',{query:JSON.stringify(that.state.query)},function(res){
               that.setState({
               	   data:res.params.shops,
               	   total:res.params.total
               })
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
    dropdownclick(record){
         this.setState({opertion:record})
    };
    menuClick(e){
	    	let show;
	    	if(e.key==='1'){
	               show=<Shopadd  params={this.state.opertion}/>;
	    	}
	    	if(e.key==='2'){
	    	   let query={type:'商品分类',shopId:this.state.opertion.sunwouId,url:'/category',add:'/addproductcategory'};
	    	   localStorage.setItem('category',JSON.stringify(query));
	           Static.history.push({pathname:'/app/category'});
	    	}
	    	if(e.key==='3'){
	    		show=<Opentime url='shop/opentime' shopId={this.state.opertion.sunwouId}/>
	    	}
	    	if(e.key==='4'){
	    		show=<Fullcut url='shop/fullcut' shopId={this.state.opertion.sunwouId}/>
	    	}
	    	if(e.key==='6'){
	    		let that=this;
	    		Static.request('shop/update',{sunwouId:this.state.opertion.sunwouId,isDelete:true},function(res){
	               message.success(res.msg);
	               that.getData();
				});
	    		return;
	    	}
	    	 this.setState({
			       	Modalkey:this.state.Modalkey+1,
			       	updatevisible:true,
			       	show:show
			       })
    	};
    hideModal(){
          this.setState({
          	updatevisible:false
          })
          this.getData();
    };
	render() {
           const that=this;
         const menu = (
		  <Menu   onClick={that.menuClick.bind(that)}>
		    <Menu.Item key="1">编辑</Menu.Item>
		    <Menu.Item key="2">商品分类</Menu.Item>
		    <Menu.Item key="3">营业时间</Menu.Item>
		    <Menu.Item key="4">满减优惠</Menu.Item>
{/*		    <Menu.Item key="5">订单记录</Menu.Item>*/}
		    <Menu.Item key="6">删除</Menu.Item>
		  </Menu>
		);
		const columns = [{
			  title: '图片',
			  render: (text, record) => (
			   <Avatar alt="图片" size="large" src={record.shopImage} />
			  ),
			  key: 'avatarUrl',
			},{
			  title: '店铺名',
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
			  title: '店铺号码',
			  key: 'shopPhone',
			  dataIndex:'shopPhone'
			},{
			  title: '营业状态',
			  key: 'open',
			  render(text, record) {
			    if(record.open){
			    	return <Tag color="green">营业中</Tag>
			    }else{
			    	return <Tag color="red">停业中</Tag>
			    }
			  },
			},{
			  title: '起送价格',
			  key: 'startPrice',
			  dataIndex:'startPrice'
			},{
			  title: '餐盒费',
			  key: 'boxPrice',
			  dataIndex:'boxPrice'
			},{
			  title: '配送费',
			  key: 'sendPrice',
			  dataIndex:'sendPrice'
			},{
			  title: '满减商家承担',
			  key: 'fullCutRate',
			  dataIndex:'fullCutRate',
			  render(text, record) {
			    return record.fullCutRate*100+'%';
			  },
			},{
			  title: '商品折扣承担',
			  key: 'productDiscountRate',
			  dataIndex:'productDiscountRate',
			  render(text, record) {
			    return record.productDiscountRate*100+'%';
			  },
			},{
			  title: '抽成',
			  key: 'rate',
			  dataIndex:'rate',
			  render(text, record) {
			    return record.rate*100+'%';
			  },
			},{
			  title: '配送模式',
			  key: 'sendMode',
			  render(text, record) {
			    if(record.sendModel){
			    	return <Tag color="green">开启中</Tag>
			    }else{
			    	return <Tag color="red">关闭中</Tag>
			    }
			  },
			},{
			  title: '自取模式',
			  key: 'getMode',
			  render(text, record) {
			    if(record.getModel){
			    	return <Tag color="green">开启中</Tag>
			    }else{
			    	return <Tag color="red">关闭中</Tag>
			    }
			  },
			},{
			  title: '操作',
			  key: 'cz',
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
			          key={this.state.Modalkey}
			          title="编辑"
			          visible={this.state.updatevisible}
			           onCancel={this.hideModal.bind(that)}
			          footer={null}
			        >
			        {this.state.show}
			       </Modal>
			    <BreadcrumbCustom paths={['首页','用户管理','商铺列表']}/>
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
