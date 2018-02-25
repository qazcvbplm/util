import React from 'react';
import {Table,Input,Button,Avatar} from 'antd';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import Static from '../static/Static';
import './user.css';
export default class Userlist extends React.Component {
	constructor(props) {
		super(props);
		 this.state={
              	data:[],
              	query:{wheres:[
              		{value:'schoolId',opertionType:'equal',opertionValue:Static.school.sunwouId}
              		],
              		pages:{currentPage:1,size:10}},
              	total:0
          }
          this.getData();
	};
    getData(){
         let that=this;
         Static.Loading();
		Static.request('user/find',{query:JSON.stringify(that.state.query)},function(res){
               that.setState({
               	   data:res.params.users,
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
    pageChange(){

    };
	render() {

		const columns = [{
			  title: '头像',
			  render: (text, record) => (
			   <Avatar alt="头像" size="large" src={record.avatarUrl} />
			  ),
			  key: 'avatarUrl',
			}, {
			  title: 'openid',
			  dataIndex: 'openid',
			  key: 'openid',
			}, {
			  title: '昵称',
			  dataIndex: 'nickName',
			  key: 'nickName',
			  filterDropdown: (
		        <div className="custom-filter-dropdown">
		          <Input
		            placeholder="Search"
		            onChange={this.search.bind(this)}
		          />
		          <Button type="primary" onClick={this.onSearch.bind(this,"nickName")}>Search</Button>
		        </div>
		      ),
			}, {
			  title: '性别',
			  dataIndex: 'gender',
			  key: 'gender',
			}, {
			  title: '手机',
			  render:function(text,record){
			      if(record.phone)
			      	return <p>{record.phone}</p>;
			      else
			      	return <p>未绑定</p>;
			  },
			  key: 'phone',
			   filterDropdown: (
		        <div className="custom-filter-dropdown">
		          <Input
		            placeholder="Search"
		            onChange={this.search.bind(this)}
		          />
		          <Button type="primary" onClick={this.onSearch.bind(this,"phone")}>Search</Button>
		        </div>
		      ),
			}, {
			  title: '住址',
			  key: 'address',
			  render: (text, record) => (
			    <p>{record.province}{record.city}</p>
			  ),
			}, {
			  title: '上次登录时间',
			  key: 'lastLoginTime',
			  dataIndex: 'lastLoginTime',
			}, {
			  title: '积分',
			  key: 'source',
			  dataIndex: 'source',
			}, {
			  title: '余额',
			  key: 'money',
			  dataIndex: 'money',
			}];
		return (
			<div >
			    <BreadcrumbCustom paths={['首页','用户管理','用户列表']}/>
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
