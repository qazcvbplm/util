import React from 'react';
import {Table} from 'antd';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import Static from '../static/Static';
export default class WithdrawalsLog extends React.Component {
	constructor(props) {
		super(props);
		 this.state={
              	data:[],
              	query:{wheres:[
              		{value:'schoolId',opertionType:'equal',opertionValue:Static.school.sunwouId}
              		],
              		pages:{currentPage:1,size:10},
              		sorts:[{value:"createTime",asc:false}]
              	},
              	total:0
          }
          this.getData();
	};
    getData(){
         let that=this;
         Static.Loading();
		Static.request('withdrawalslog/find',{query:JSON.stringify(that.state.query)},function(res){
               that.setState({
               	   data:res.params.logs,
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
			  title: '提现时间',
			  dataIndex: 'createTime',
			  key: 'createTime',
			}, {
			  title: '类型',
			  dataIndex: 'type',
			  key: 'type',
			   filters: [
		        { text: '配送员提现', value: '配送员提现' },
		        { text: '代理零钱提现', value: '代理零钱提现' },

		      ],
      			onFilter: (value, record) => record.type.includes(value),
			},{
			  title: '金额',
			  key: 'amount',
			  render(text,record){
                   return record.amount+"元";
			  }
			},{
			  title: '配送员姓名',
			  dataIndex: 'name',
			  key: 'name',
			}];
		return (
			<div >
			    <BreadcrumbCustom paths={['首页','提现日志','']}/>
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
