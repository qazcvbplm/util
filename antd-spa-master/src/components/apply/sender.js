import React from 'react';
import {Table,InputNumber,Button,Dropdown,Icon,Modal,Menu,Tag,Checkbox,Divider,message} from 'antd';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import Static from '../static/Static';
const CheckboxGroup = Checkbox.Group;
let that;
export default class SenderList extends React.Component {
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
              	floorDefault:[],
          }
          this.getData();
          that.initFloor();
	};
  initFloor(){
      Static.request('floor/find',{query:JSON.stringify(that.state.query)},function(res){
                   that.setState({
                       floor:res.params.floors,
                   })
        });
  };
    getData(){
         Static.Loading();
		Static.request('sender/find',{query:JSON.stringify(that.state.query)},function(res){
               that.setState({
               	   data:res.params.senders,
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
    	if(!that.state.floorsId||!that.state.rate){
    		message.error("请填写参数");
    		return;
    	}
    	 let floorName=[];
    	 for(let i=0;i<this.state.floorsId.length;i++)
    	 {
    	   for(let j=0;j<this.state.floor.length;j++){
    	   	    if(this.state.floor[j].sunwouId===this.state.floorsId[i]){
    	   	    	floorName.push(this.state.floor[j].name);
    	   	    	break;
    	   	    }
    	   	    	    
    	   }
       
    	 }
          Static.Loading();
          Static.request('sender/update',{
          	sunwouId:that.state.temp.sunwouId,
          	floorsId:that.state.floorsId.toString(),
          	floors:floorName.toString(),
          	rate:that.state.rate/100
          },function(res){
                   if(res.code){
                    message.success(res.msg);
                   	that.getData();
                   }else{
                    message.error(res.msg);
                   }
    		});
    };
    floorClick(e){
       this.setState({
       	   floorsId:e
       })
    };
    number(e){
		this.setState({
       	   rate:e
       })
    };
    menuClick(e){
    	if(e.key==='1'){
    		   let data=[];
    		   for(let i=0;i<this.state.floor.length;i++){
                      data.push({label:this.state.floor[i].name,value:this.state.floor[i].sunwouId});
    		   }
    		   let rate=this.state.temp.rate*100;
    		   let show=<div>
    		   <CheckboxGroup defaultValue={this.state.temp.floorsId}   options={data} onChange={this.floorClick.bind(this)} />
    		   <Divider />
    		   <span>对订单抽成</span>：<InputNumber defaultValue={rate} formatter={value => `${value}%`} onChange={this.number.bind(this)} min={0} max={100} />
    		   </div>;
               that.setState({visible:true,show:show,floorsId:this.state.temp.floorsId,rate:(this.state.temp.rate*100)});
               return;
    	}
    	let pass=false;
    	if(e.key==='2'){
    		pass=true;
    	}
    	if(e.key==='3'){
    	}
    	    Static.Loading();
    		Static.request('sender/pass',{
                sunwouId:that.state.temp.sunwouId,
                pass:pass
    		},function(res){
    			message.success(res.msg);
                 that.getData();
    		})
    		Static.hideLoading();
      
    };
    dropdownclick(record){
            that.setState({temp:record});
    };
	render() {
		const that=this;
		const menu = (
		  <Menu  onClick={that.menuClick.bind(that)}>
		    <Menu.Item key="1">编辑</Menu.Item>
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
			  title: '班级',
			  key: 'classes',
			  dataIndex:'classes'
			},{
			  title: '学号',
			  key: 'classesNumber',
			  dataIndex:'classesNumber'
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
			  title: '负责楼栋',
			  key: 'floors', 
			  dataIndex:'floors' 
			},{
			  title: '抽成',
			  key: 'rate',
			  render(text,record){
			  	if(record.rate)
                   return record.rate*100+'%';
               else
               	   return '暂无';
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
		          title="分配楼栋"
		          visible={this.state.visible}
		          onOk={this.handleOk.bind(this)}
		          onCancel={this.handleCancel.bind(this)}
		        >
		          {this.state.show}
		        </Modal>
			    <BreadcrumbCustom paths={['首页','用户管理','配送员管理']}/>
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
