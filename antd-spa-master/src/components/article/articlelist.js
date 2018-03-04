import React from 'react';
import {Table,Button,Icon,Modal,message,Tag,Divider,Menu,Dropdown} from 'antd';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import Static from '../static/Static';
import Article from './article';
export default class ArticleList extends React.Component {
	constructor(props) {
		super(props);
		 this.state={
              	data:[],
              	query:{
              		wheres:[
              		{value:'schoolId',opertionType:'equal',opertionValue:Static.school.sunwouId},
              		{value:'isDelete',opertionType:'equal',opertionValue:false}
              		],
              		pages:{currentPage:1,size:10}
                },
              	total:0,
                deletevisible:false,
                updatevisible:false,
                refresh:false,
                key:0,
                show:null,
                trigger:'click'
          }
          this.getData();
	};
    getData(){
         let that=this;
		Static.request('article/find',{query:JSON.stringify(that.state.query)},function(res){
               that.setState({
               	   data:res.params.articles,
               	   total:res.params.total,
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
    handleCancel(e){
      this.getData();
        this.setState({
          deletevisible: false,
          updatevisible:false
        });
   };
   showModal(name,record){
       let show;
       if(name==='add'){
            show=<Article  />
       }
       this.setState({
        show:show,
        key:this.state.key+1,
        updatevisible:true,
       })
   };
   dropdownclick(record){
         this.setState({opertion:record})
    };
   menuClick(e){
      let show;
      if(e.key==='1'){
               show=<Article  params={this.state.opertion}/>;
                this.setState({
                  show:show,
                  key:this.state.key+1,
                  updatevisible:true,});

      }
      if(e.key==='2'){
            let that=this;
           Static.request("/article/update",{sunwouId:this.state.opertion.sunwouId,
            isDelete:true},function(res){
                  if(res.code){
                       message.success("删除成功");
                  }
                  that.getData();
            });
      }
       if(e.key==='3'){
            localStorage.setItem("richId",this.state.opertion.sunwouId);
            Static.history.push({pathname:'/app/rich'})
      }
      
    };
	render() {
        const that=this;
     const menu = (
      <Menu   onClick={that.menuClick.bind(that)}>
        <Menu.Item key="1">编辑</Menu.Item>
        <Menu.Item key="3">富文本</Menu.Item>
        <Menu.Item key="2">删除</Menu.Item>

      </Menu>);
		const columns = [{
			  title: '图片',
			  render: (text, record) => (
			   <img alt="t" className="carousel"  src={record.image}></img>
			  ),
			  key: 'avatarUrl',
			},{
			  title: '标题',
			  key: 'title',
			 dataIndex:'title'
			},{
			  title: '描述',
			  key: 'des',
			 dataIndex:'des'
			},{
			  title: '主办方',
			  key: 'zbf',
			 dataIndex:'zbf'
			},{
			  title: '阅读量',
			  key: 'visitor',
			 dataIndex:'visitor'
			},{
	        title: '上架状态',
	        key: 'isShow',
	        render(text, record){
	               if(record.isShow){
	                return <Tag color="green">上架中</Tag>;
	               }else{
	                return <Tag color="red">已下架</Tag>;
	               }
	        }
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
{/*        <Modal
          title="是否确定删除"
          visible={this.state.deletevisible}
          onOk={this.delete.bind(that)}
          onCancel={this.handleCancel.bind(that)}
        >
        </Modal>*/}
        <Modal
          key={this.state.key}
          title="编辑"
          visible={this.state.updatevisible}
           onCancel={this.handleCancel.bind(that)}
          footer={null}
        >
        {this.state.show}
        </Modal>
			    <BreadcrumbCustom paths={['首页','管理','文章列表']}/>
          <div className="form">
          <Button onClick={this.showModal.bind(this,'add')} type="primary" ><span><Icon type="plus" /></span></Button>
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
